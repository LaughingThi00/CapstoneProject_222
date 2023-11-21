import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { createWalletEther, createWalletBitcoin } from '../../utils/wallet';
import { AddressDto } from './../../common/dtos/address.dto';
import { ExceptionService } from 'src/common/service/exception.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRep: Repository<Wallet>,
  ) {}

  public async findAll() {
    const users = await this.walletRep.find();
    return users;
  }

  public async findUser(params: CreateWalletDto) {
    const { userId, merchant } = params;
    const users = await this.walletRep.find({
      where: {
        userId: userId,
        merchant: merchant,
      },
    });
    return users;
  }

  public async createWallet(params: CreateWalletDto) {
    const { userId, merchant } = params;
    const users = await this.walletRep.find({
      where: {
        userId: userId,
        merchant: merchant,
      },
    });
    if (!users || users.length == 0) {
      const userIndex = await this.walletRep.find();
      const walletEther = createWalletEther(userIndex.length + 1);
      const userWallet = {
        userId: userId,
        merchant: merchant,
        address: walletEther.address.toLowerCase(),
        userIndex: walletEther.userIndex,
      };
      const saveUser = this.walletRep.create(userWallet);
      await this.walletRep.save(saveUser);
      // console.log('userWallet:', userWallet)

      return saveUser;
    } else {
      console.log('User has been created wallet!');
      return null;
    }
  }

  // public async testCreateWallet() {
  //     const userIndex = await this.walletRep.find()
  //     const walletEther = createWalletEther(userIndex.length + 1);
  //     return {
  //         address: walletEther.address.toLowerCase(),
  //         publicKey: walletEther.publicKey,
  //         privateKey: walletEther.privateKey,
  //         mnemonic: walletEther.mnemonic,
  //         userIndex: walletEther.userIndex
  //     }
  // }

  public async findFromAdress(userAddress: string) {
    const users = await this.walletRep.find();
    const result = users.find((item) => item.address === userAddress);
    return result;
  }

  public async findOne(userId: string) {
    return await this.walletRep.find({ userId });
  }

  public async deleteOne({
    userId,
    address,
  }: {
    userId?: string;
    address?: string;
  }) {
    if (!userId && !address) {
      const res = userId
        ? await this.walletRep.delete({ userId })
        : await this.walletRep.delete({ address });
      return (
        res ?? ExceptionService.throwInternalServerError('Lỗi khi xóa ví!')
      );
    } else return ExceptionService.throwNotFound('Không tìm thấy User!');
  }

  public async deleteAll() {
    return await this.walletRep.delete({});
  }
}
