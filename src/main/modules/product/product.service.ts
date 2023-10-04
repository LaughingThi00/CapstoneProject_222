import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ExceptionService } from 'src/common/service/exception.service';
import { MerchantService } from './../merchant/merchant.service';
import { UserService } from '../user/user.service';
import { TransactionService } from '../transaction/transaction.service';
import { User } from '../user/entities/user.entity';
import { FindTransactionDto } from './dto/findTransaction.dto';
import { BuyCryptoDto } from './dto/buyCrypto.dto';
import { CommonService } from 'src/main/service/CommonService';
import { BillService } from '../bill/bill.service';
import { Bill } from '../bill/entities/bill.entity';
import { PurchaseDto } from './dto/purchase.dto';
import { DepositVNDDto } from './dto/depositVND.dto';

@Injectable()
export class ProductService {
  constructor(
    private merchantRep: MerchantService,
    private userRep: UserService,
    private transactionRep: TransactionService,
    private commonService: CommonService,
    private billService: BillService,
  ) {
    //
  }

  public async getPrice(): Promise<any> {
    try {
      const response1 = await axios.get(
        'https://api.binance.com/api/v3/ticker/price?symbols=["BNBUSDT","ETHUSDT","BTCUSDT"]',
        {},
      );
      const response2 = await axios.get(
        'https://api.apilayer.com/fixer/latest?base=USD&symbols=VND',
        {
          headers: {
            apiKey: 'IKZ11s36ZMp1fbYqP1M4tgv2ROIQGDHj',
          },
        },
      );
      if (response1.data && response2.data) {
        let price = [];
        const base_VND = response2.data.rates.VND;

        response1.data.forEach((item) => {
          switch (item.symbol) {
            case 'BTCUSDT':
              price.push({ name: 'BTC', price: base_VND * item.price });
              break;
            case 'ETHUSDT':
              price.push({ name: 'ETH', price: base_VND * item.price });
              break;
            case 'BNBUSDT':
              price.push({ name: 'BNB', price: base_VND * item.price });
              break;
          }
        });
        price.push({ name: 'USDT', price: base_VND });

        return price;
      } else {
        return ExceptionService.throwInternalServerError();
      }
    } catch (error) {
      console.log('Error');
      return ExceptionService.throwInternalServerError();
    }
  }

  public async createMerchant(partner_code: string, name?: string) {
    return await this.merchantRep.createOne({ partner_code, name });
  }

  public async findUserList(merchant: string, onlyAddress: boolean = false) {
    const list = await this.userRep.findAllWithCondition({ merchant });
    return onlyAddress ? list.map((user) => user.address) : list;
  }

  public async findUserInfo(userId: string) {
    return await this.userRep.findOneWithCondition({ userId });
  }

  public async createUser(merchant: string, userId: string) {
    return await this.userRep.createOne({ merchant, userId });
  }

  public async findTransaction(info: FindTransactionDto) {
    const transactions = await this.transactionRep.findAll();

    switch (info.by) {
      case 'merchant':
        if (!info.merchant) return ExceptionService.throwBadRequest();
        const listAddr = await this.findUserList(info.merchant, true);
        return transactions.filter((transaction) => {
          listAddr.includes(transaction.from_ as string & User) ||
            listAddr.includes(transaction.to_ as string & User);
        });

      case 'userId':
        if (!info.userId) return ExceptionService.throwBadRequest();
        const user = await this.userRep.findOneWithCondition({
          userId: info.userId,
        });
        if (!(user instanceof User)) return ExceptionService.throwBadRequest();
        return transactions.filter((transaction) => {
          user.address === transaction.from_ ||
            user.address === transaction.to_;
        });

      case 'receiver':
        if (!info.receiver) return ExceptionService.throwBadRequest();
        return transactions.filter((transaction) => {
          transaction.from_ === info.receiver;
        });

      case 'sender':
        if (!info.sender) return ExceptionService.throwBadRequest();
        return transactions.filter((transaction) => {
          transaction.to_ === info.sender;
        });

      case 'hash':
        if (!info.hash) return ExceptionService.throwBadRequest();
        return transactions.filter((transaction) => {
          transaction.to_ === info.hash;
        });

      default:
        break;
    }
  }

  public async buyCrypto(info: BuyCryptoDto) {
    try {
      const checkBillResult = await this.commonService.checkBalance(
        info.bill,
        info.amountVND,
        info.platform,
      );
      if (!checkBillResult) return ExceptionService.throwBadRequest();
      else {
        const responseBill = await this.billService.createOne({
          id_: info.bill,
          platform: info.platform,
        });
        if (!(responseBill instanceof Bill))
          ExceptionService.throwInternalServerError();
        const updateSysBalance = await this.userRep.increaseToken({
          token: 'VND',
          amount: info.amountVND,
          userId: 'SYSTEM',
        });

        if (!(updateSysBalance instanceof User))
          return ExceptionService.throwInternalServerError();

        const result = 'TODO_BlockchainService';

        return result ? result : ExceptionService.throwInternalServerError();
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async purchase(info: PurchaseDto) {
    info.amount = Number(info.amount);

    const pricelist = await this.getPrice();

    let sell: number = info.by_token === 'VND' ? 1 : 0,
      buy: number = 0,
      transfer: number;

    pricelist.forEach((tag) => {
      if (tag.name === info.by_token) sell = tag.price;
      else if (tag.name === info.for_token) buy = tag.price;
    });

    if (!sell || !buy) return ExceptionService.throwBadRequest();

    transfer = (info.amount * sell) / buy;
    let commission = info.amount * info.commission;
    return (await this.userRep.decreaseToken({
      token: info.by_token,
      amount: info.amount,
      userId: info.buyer,
    })) &&
      (await this.userRep.increaseToken({
        token: info.by_token,
        amount: info.amount,
        userId: info.seller,
      })) &&
      (await this.userRep.decreaseToken({
        token: info.for_token,
        amount: transfer,
        userId: info.buyer,
      })) &&
      (await this.userRep.increaseToken({
        token: info.by_token,
        amount: transfer - commission,
        userId: info.seller,
      })) &&
      (await this.userRep.systemReceiveToken({
        token: info.by_token,
        amount: commission,
      }))
      ? {
          soldToken: info.by_token,
          amountSold: info.amount,
          buyedToken: info.for_token,
          amountBuyed: transfer,
          commissionLoss: commission,
        }
      : ExceptionService.throwInternalServerError();
  }

  public async depositVND(info: DepositVNDDto) {
    if (
      await this.commonService.checkBalance(
        info.bill,
        info.amountVND,
        info.platform,
      )
    ) {
      const result = await this.userRep.increaseToken({
        token: 'VND',
        amount: info.amountVND,
        userId: info.userId,
      });
      if (result && result instanceof User)
        return (await this.billService.createOne({
          id_: info.bill,
          platform: info.platform,
        }))
          ? result
          : ExceptionService.throwInternalServerError();
    } else return ExceptionService.throwInternalServerError();
  }
}
