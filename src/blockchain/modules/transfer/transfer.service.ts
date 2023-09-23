import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { Transfer } from './entities/transfer.entity';
import { Web3 } from '../../utils/web3';
import { Contract } from '../../utils/contract';
import { TOKENS } from '../../constants/address';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRep: Repository<Transfer>,
    private walletRep: WalletService,
  ) { }
  public async findTransaction({
    transactionHash,
  }: {
    transactionHash: string;
  }) {
    const transactions = await this.transferRep.find({
      where: {
        transactionHash: transactionHash,
      },
    });
    return transactions;
  }

  public async createTokenTransfer(params: CreateTransferDto) {
    const { userId, merchant, chainId, toAddress, amount, asset } = params;
    const users = await this.walletRep.findUser({
      userId: userId,
      merchant: merchant,
    });
    if (users.length == 0) {
      return {
        message: 'user is not found',
      };
    } else {
      const privateKey = process.env.HOT_WALLET_PRIVATE_KEY;
      const web3 = await Web3.httpProvider(chainId);
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const tokenAddress = TOKENS[asset][chainId];
      const tokenContract = await Contract.getTokenContract({
        chainId,
        address: tokenAddress,
      });

      const dataTransfer = tokenContract.methods.transfer(
        toAddress.toLowerCase(),
        web3.utils.toWei(amount.toString(), 'ether'),
      );

      const count = await web3.eth.getTransactionCount(account.address);

      const tx = {
        from: account.address,
        gas: 501064,
        to: tokenAddress.toLowerCase(),
        data: dataTransfer.encodeABI(),
        nonce: Number(web3.utils.toHex(count)),
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
      // console.log("receipt", receipt)

      // await updateBalance({
      //     userId,
      //     merchant,
      //     transactionHash: receipt.transactionHash,
      //     asset,
      //     type: "-",
      //     amount
      // });
      const txh = {
        userId: userId,
        merchant: merchant,
        blockNumber: receipt.blockNumber,
        timeStamp: (await Web3.getBlock(receipt.blockNumber, chainId))
          .timestamp,
        transactionHash: receipt.transactionHash.toLowerCase(),
        amount: amount,
        asset: asset,
        toAddress: toAddress.toLowerCase(),
        tokenAddress: tokenAddress.toLowerCase(),
        effectiveGasPrice: receipt.effectiveGasPrice,
        gasUsed: receipt.gasUsed,
      };
      const result = this.transferRep.create(txh);
      await this.transferRep.save(result);
      return result;
    }
  }

  public async createNativeTransfer(params: CreateTransferDto) {
    const { userId, merchant, chainId, toAddress, amount, asset } = params;
    const users = await this.walletRep.findUser({
      userId: userId,
      merchant: merchant,
    });
    if (users.length == 0) {
      return {
        message: 'user is not found',
      };
    } else {
      const privateKey = process.env.HOT_WALLET_PRIVATE_KEY;
      const web3 = Web3.httpProvider(chainId);
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const tokenAddress = '0x0';

      const count = await web3.eth.getTransactionCount(account.address);

      const tx = {
        from: account.address,
        gas: 501064,
        value: web3.utils.toWei(amount.toString(), 'ether'),
        to: toAddress,
        nonce: Number(web3.utils.toHex(count)),
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
      // console.log("receipt", receipt)

      // await updateBalance({
      //     userId,
      //     merchant,
      //     transactionHash: receipt.transactionHash,
      //     asset,
      //     type: "-",
      //     amount
      // });
      const txh = {
        userId: userId,
        merchant: merchant,
        blockNumber: receipt.blockNumber,
        timeStamp: (await Web3.getBlock(receipt.blockNumber, chainId))
          .timestamp,
        transactionHash: receipt.transactionHash.toLowerCase(),
        amount: amount,
        asset: asset,
        toAddress: toAddress.toLowerCase(),
        tokenAddress: tokenAddress.toLowerCase(),
        effectiveGasPrice: receipt.effectiveGasPrice,
        gasUsed: receipt.gasUsed,
      };
      const result = this.transferRep.create(txh);
      await this.transferRep.save(result);
      return result;
    }
  }
}
