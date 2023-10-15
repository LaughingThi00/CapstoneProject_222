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
import { ChangeTokenDto } from './dto/changeToken.dto';
import { TransactionType } from '../transaction/dto/transaction.dto';
import { ExchangeAssetService } from 'src/blockchain/modules/exchange-asset/exchange-asset.service';
import { TransferService } from 'src/blockchain/modules/transfer/transfer.service';
import { Transfer } from 'src/blockchain/modules/transfer/entities/transfer.entity';
import { feeEstimate } from 'src/blockchain/utils/marketdata';
import { FEE_SYSTEM } from 'src/blockchain/constants/fee';

@Injectable()
export class ProductService {
  constructor(
    private merchantService: MerchantService,
    private userService: UserService,
    private transactionService: TransactionService,
    private commonService: CommonService,
    private billService: BillService,
    private exchangeAssetService: ExchangeAssetService,
    private transferService: TransferService,
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
    try {
      return await this.merchantService.createOne({ partner_code, name });
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }

  public async findUserList(merchant: string, onlyAddress: boolean = false) {
    try {
      const list = await this.userService.findAllWithCondition({ merchant });
      return onlyAddress ? list.map((user) => user.address) : list;
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }

  public async findUserInfo(userId: string) {
    try {
      return await this.userService.findOneWithCondition({ userId });
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }

  public async createUser(merchant: string, userId: string) {
    try {
      return await this.userService.createOne({ merchant, userId });
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }

  public async findTransaction(info: FindTransactionDto) {
    try {
      const transactions = await this.transactionService.findAll();

      switch (info.by) {
        case 'merchant':
          if (!info.merchant) return ExceptionService.throwBadRequest();
          const listAddr = (await this.findUserList(
            info.merchant,
            true,
          )) as string[];

          return transactions.filter((transaction) => {
            return (
              listAddr.includes(transaction.from_) ||
              listAddr.includes(transaction.to_)
            );
          });

        case 'userId':
          if (!info.userId) return ExceptionService.throwBadRequest();
          const user = await this.userService.findOneWithCondition({
            userId: info.userId,
          });
          if (!(user instanceof User))
            return ExceptionService.throwBadRequest();
          return transactions.filter((transaction) => {
            return (
              user.address === transaction.from_ ||
              user.address === transaction.to_
            );
          });

        case 'receiver':
          if (!info.receiver) return ExceptionService.throwBadRequest();
          return transactions.filter((transaction) => {
            return transaction.from_ === info.sender;
          });

        case 'sender':
          if (!info.sender) return ExceptionService.throwBadRequest();
          return transactions.filter((transaction) => {
            return transaction.to_ === info.receiver;
          });

        case 'hash':
          if (!info.hash) return ExceptionService.throwBadRequest();
          return transactions.filter((transaction) => {
            return transaction.hash === info.hash;
          });

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }

  public async calculateToken({
    byToken,
    forToken,
    amount,
    commission = 2.5,
  }: {
    byToken: string;
    forToken: string;
    amount: number;
    commission?: number;
  }) {
    try {
      amount = Number(amount);

      let transfer = await this.exchangeAssetService.exchangeToken({
        tokenIn: byToken,
        tokenOut: forToken,
        amountIn: amount,
      });
      if (transfer === undefined || transfer === null)
        return ExceptionService.throwInternalServerError();

      return { transfer, commission: (amount * commission) / 100 };
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }

  //Help user deposit VND to user's wallet be transfering e-banking
  public async depositVND(info: DepositVNDDto) {
    try {
      if (
        await this.commonService.checkBalance(
          info.bill,
          info.amountVND,
          info.platform,
        )
      ) {
        const result = await this.userService.increaseToken({
          token: 'VND',
          amount: info.amountVND,
          userId: info.userId,
        });
        if (result && result instanceof User) {
          const user = await this.userService.findOneWithCondition({
            userId: info.userId,
          });

          await this.billService.createOne({
            id_: info.bill,
            platform: info.platform,
          });

          return await this.transactionService.createOne({
            type: TransactionType.DepositVND,
            from_: user.address,
            to_: user.address,
            bill: info.bill,
            byToken: 'VND',
            byAmount: info.amountVND,
          });
        }
      } else return ExceptionService.throwInternalServerError();
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }

  //Helps users change tokens in the wallet
  public async changeToken(info: ChangeTokenDto) {
    try {
      const user = await this.userService.findOneWithCondition({
        userId: info.userId,
      });

      if (!user) return ExceptionService.throwBadRequest();

      const amountchange = await this.calculateToken({
        byToken: info.byToken,
        amount: info.amount,
        forToken: info.forToken,
      });
      // if (typeof amountchange === void) return ExceptionService.throwInternalServerError();
      if (!amountchange) return ExceptionService.throwInternalServerError();

      user.asset.forEach((item) => {
        if (item.token === info.byToken) {
          if (item.amount < Number(info.amount))
            return ExceptionService.throwBadRequest();

          item.amount -= Number(info.amount);
        } else if (item.token === info.forToken) {
          item.amount += amountchange.transfer;
        }
      });

      await this.userService.saveUser(user);

      return await this.transactionService.createOne({
        type: TransactionType.ChangeToken,
        from_: user.address,
        to_: user.address,
        forToken: info.forToken,
        byToken: info.byToken,
        byAmount: info.amount,
        forAmount: amountchange.transfer,
      });
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }

  // Helps users buy crypto with transfering e-banking to user's wallet
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

        const user = await this.userService.findOneWithCondition({
          userId: info.userId,
        });

        const fee = await feeEstimate('VND', info.amountVND);

        const amountchange = await this.calculateToken({
          byToken: 'VND',
          amount: info.amountVND - fee.total,
          forToken: info.forToken,
        });

        if (!amountchange) return ExceptionService.throwInternalServerError();

        user.asset.forEach((item) => {
          if (item.token === 'VND') {
            if (item.amount + Number(info.amountVND) < fee.total)
              return ExceptionService.throwBadRequest();

            // item.amount -= Number(info.amountVND);
          } else if (item.token === info.forToken) {
            item.amount += amountchange.transfer;
          }
        });

        await this.userService.saveUser(user);

        return await this.transactionService.createOne({
          type: TransactionType.BuyCryptoDirect,
          from_: user.address,
          to_: user.address,
          forToken: info.forToken,
          byToken: 'VND',
          byAmount: info.amountVND,
          forAmount: amountchange.transfer,
          bill: info.bill,
          commission: fee.commission,
          gas: fee.gas,
        });
      }
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }

  // Helps users transfer tokens from user's wallet to another user's wallet inside the system
  public async transferInbound(info: PurchaseDto) {
    try {
      //find 2 users
      const sender = await this.userService.findOneWithCondition({
        userId: info.sender,
      });
      const receiver = await this.userService.findOneWithCondition({
        userId: info.receiver,
      });

      if (!sender || !receiver) return ExceptionService.throwBadRequest();

      //increase, decrease 2 users
      if (
        await this.userService.decreaseToken({
          userId: info.sender,
          token: info.byToken,
          amount: info.byAmount,
        })
      )
        await this.userService.increaseToken({
          userId: info.receiver,
          token: info.byToken,
          amount: info.byAmount,
        });

      //increase for system wallet commission 2.5

      //create transaction
      return await this.transactionService.createOne({
        type: TransactionType.TransferInbound,
        from_: sender.address,
        to_: receiver.address,
        byToken: info.byToken,
        byAmount: info.byAmount,
      });
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }

  // Helps users transfer tokens from user's wallet to someone's hot wallet out of the system
  public async transferOutbound(info: PurchaseDto) {
    try {
      //find user
      const sender = await this.userService.findOneWithCondition({
        userId: info.sender,
      });

      if (!sender) return ExceptionService.throwBadRequest();

      // calculate gas fee, commission
      //increase, decrease user

      const fee = await feeEstimate('VND', info.byAmount);

      await this.userService.decreaseToken({
        userId: info.sender,
        token: 'VND',
        amount: fee.total,
      });

      await this.userService.decreaseToken({
        userId: info.sender,
        token: info.byToken,
        amount: info.byAmount,
      });

      //call blockchain service to transfer tokens
      const transfer = await this.transferService.createTokenTransfer({
        userId: info.sender,
        merchant: info.merchant,
        chainId: 97,
        toAddress: info.receiver,
        amount: info.byAmount,
        asset: info.byToken,
      });
      if (!transfer || !(transfer instanceof Transfer))
        return ExceptionService.throwInternalServerError();
      //increase for system wallet commission 2.5

      //create transaction
      return await this.transactionService.createOne({
        type: TransactionType.TransferOutbound,
        from_: sender.address,
        to_: info.receiver,
        byToken: info.byToken,
        byAmount: info.byAmount,
        hash: transfer.transactionHash,
        commission: fee.commission,
        gas: fee.gas,
      });
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }

  // Helps users withdraw tokens to user's blockchain account
  public async withdrawBlockchain(info: PurchaseDto) {
    try {
      //find  user
      const sender = await this.userService.findOneWithCondition({
        userId: info.sender,
      });

      if (!sender) return ExceptionService.throwBadRequest();

      // calculate gas fee, commission
      //increase, decrease user

      const fee = await feeEstimate('VND', info.byAmount);

      await this.userService.decreaseToken({
        userId: info.sender,
        token: 'VND',
        amount: fee.total,
      });

      await this.userService.decreaseToken({
        userId: info.sender,
        token: info.byToken,
        amount: info.byAmount,
      });

      //call blockchain service to transfer tokens
      const transfer = await this.transferService.createTokenTransfer({
        userId: info.sender,
        merchant: info.merchant,
        chainId: 97,
        toAddress: info.receiver,
        amount: info.byAmount,
        asset: info.byToken,
      });
      if (!transfer || !(transfer instanceof Transfer))
        return ExceptionService.throwInternalServerError();
      //increase for system wallet commission 2.5

      //create transaction
      return await this.transactionService.createOne({
        type: TransactionType.WithdrawBlockchain,
        from_: sender.address,
        to_: info.receiver,
        byToken: info.byToken,
        byAmount: info.byAmount,
        hash: transfer.transactionHash,
        commission: fee.commission,
        gas: fee.gas,
      });
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }

  // Helps users withdraw VND to user's banking account
  public async withdrawBanking(info: PurchaseDto) {
    try {
      //find user
      const sender = await this.userService.findOneWithCondition({
        userId: info.sender,
      });

      if (!sender) return ExceptionService.throwBadRequest();

      const fee = await feeEstimate('VND', info.byAmount);

      //decrease user

      const decrease = await this.userService.decreaseToken({
        userId: info.sender,
        token: 'VND',
        amount: info.byAmount + fee.total,
      });

      if (!decrease) return ExceptionService.throwInternalServerError();

      //call banking service to transfer VND

      //increase for system wallet commission 2.5

      //create transaction
      return await this.transactionService.createOne({
        type: TransactionType.WithdrawBanking,
        from_: sender.address,
        to_: info.receiver,
        platformWithdraw: info.platformWithdraw,
        byToken: info.byToken,
        byAmount: info.byAmount,
        commission: fee.commission,
        gas: fee.gas,
      });
    } catch (error) {
      console.log(error);
      return ExceptionService.throwBadRequest();
    }
  }
}
