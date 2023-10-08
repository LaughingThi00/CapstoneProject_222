import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ExceptionService } from './../../../common/service/exception.service';
import { ConditionUserDto } from './dto/conditionUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { WalletService } from 'src/blockchain/modules/wallet/wallet.service';
import { Wallet } from 'src/blockchain/modules/wallet/entities/wallet.entity';
import { ChangeAmountDto } from './dto/changeAmount.dto';
import { ChangeInfoDto } from './dto/changeInfo.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRep: Repository<User>,
    private walletService: WalletService,
  ) {}

  public async findAll() {
    const users = await this.UserRep.find({ isDeleted: false });

    return users.length ? users : ExceptionService.throwNotFound();
  }

  public async findDeadWithCondition(conditionUser: ConditionUserDto) {
    const users = await this.UserRep.find({
      ...conditionUser,
      isDeleted: true,
    });

    return users.length ? users : ExceptionService.throwNotFound();
  }

  public async findAllAndDead() {
    const users = await this.UserRep.find();

    return users.length ? users : ExceptionService.throwNotFound();
  }

  public async findOneWithCondition({
    address,
    userId,
  }: {
    address?: string;
    userId?: string;
  }) {
    const user = await this.UserRep.findOne({
      where: userId
        ? {
            userId,
            isDeleted: false,
          }
        : {
            address,
            isDeleted: false,
          },
    });

    return user;
  }

  public async findAllWithCondition(conditionUser: ConditionUserDto) {
    const users = await this.UserRep.find({
      ...conditionUser,
      isDeleted: false,
    });

    return users;
  }

  public async createOne(createUser: CreateUserDto) {
    if (await this.UserRep.findOne({ ...createUser, isDeleted: false }))
      return ExceptionService.throwBadRequest();

    const wallet = await this.walletService.createWallet(createUser);
    if (wallet instanceof Wallet) {
      const user = this.UserRep.create({
        ...createUser,
        address: wallet.address,
        asset: [
          { token: 'USDT', amount: 0 },
          { token: 'ETH', amount: 0 },
          { token: 'BTC', amount: 0 },
          { token: 'BNB', amount: 0 },
          { token: 'VND', amount: 0 },
        ],
      });
      return await this.UserRep.save(user);
    } else {
      return ExceptionService.throwInternalServerError();
    }
  }

  public async increaseToken(info: ChangeAmountDto) {
    let user: User = null;

    if (info.address || info.userId) {
      user = await this.UserRep.findOne({
        where: info.userId
          ? { userId: info.userId, isDeleted: false }
          : { address: info.address, isDeleted: false },
      });
    } else return ExceptionService.throwBadRequest();

    if (!user) return ExceptionService.throwBadRequest();

    let isUpdated = false;
    user.asset.forEach((item) => {
      if (item.token === info.token) {
        item.amount += Number(info.amount);

        isUpdated = true;
      }
    });

    if (!isUpdated) return ExceptionService.throwInternalServerError();
    console.log('USER:', user);
    return await this.UserRep.save(user);
  }

  public async decreaseToken(info: ChangeAmountDto) {
    let user: User = null;

    if (info.address || info.userId) {
      user = await this.UserRep.findOne({
        where: info.userId
          ? { userId: info.userId, isDeleted: false }
          : { address: info.address, isDeleted: false },
      });
    } else return ExceptionService.throwBadRequest();

    if (!user) return ExceptionService.throwBadRequest();

    let isUpdated = false;
    user.asset.forEach((item) => {
      if (item.token === info.token) {
        item.amount -= Number(info.amount);
        isUpdated = item.amount > 0;
      }
    });

    if (!isUpdated) return ExceptionService.throwInternalServerError();

    return await this.UserRep.save(user);
  }

  public async systemReceiveToken({
    token,
    amount,
  }: {
    token: string;
    amount: number;
  }) {
    if (!(await this.findOneWithCondition({ userId: 'SYSTEM' })))
      await this.createOne({ userId: 'SYSTEM', merchant: 'SYSTEM' });
    return await this.increaseToken({ userId: 'SYSTEM', token, amount });
  }

  public async systemSendToken({
    token,
    amount,
  }: {
    token: string;
    amount: number;
  }) {
    if (!(await this.findOneWithCondition({ userId: 'SYSTEM' })))
      await this.createOne({ userId: 'SYSTEM', merchant: 'SYSTEM' });
    return await this.decreaseToken({ userId: 'SYSTEM', token, amount });
  }

  public async changeInfo(info: ChangeInfoDto) {
    let user: User = null;

    user = await this.UserRep.findOne({
      userId: info.userId,
      merchant: info.merchant,
      isDeleted: false,
    });

    if (!user) return ExceptionService.throwBadRequest();

    user.address = info.address ?? user.address;

    return await this.UserRep.save(user);
  }

  public async deleteAccount(info: ChangeInfoDto) {
    let user: User = null;

    user = await this.UserRep.findOne({
      where: info.address
        ? { address: info.address, isDeleted: false }
        : { userId: info.userId, merchant: info.merchant, isDeleted: false },
    });

    if (!user) return ExceptionService.throwBadRequest();

    user.isDeleted = true;

    return await this.UserRep.save(user);
  }

  public async recoverAccount(info: ChangeInfoDto) {
    let user: User = null;

    user = await this.UserRep.findOne({
      where: info.address
        ? { address: info.address }
        : { userId: info.userId, merchant: info.merchant },
    });

    if (!user || user.isDeleted === false)
      return ExceptionService.throwBadRequest();

    user.isDeleted = false;

    return await this.UserRep.save(user);
  }

  public async deleteForever(info: ChangeInfoDto) {
    let user: User = null;

    user = await this.UserRep.findOne({
      where: info.address
        ? { address: info.address, isDeleted: true }
        : { userId: info.userId, merchant: info.merchant, isDeleted: true },
    });

    if (!user) return ExceptionService.throwBadRequest();

    const res = await this.UserRep.remove(user);
    if (res)
      return (
        (await this.walletService.deleteOne({ userId: user.userId })) ??
        ExceptionService.throwInternalServerError()
      );
    else return ExceptionService.throwInternalServerError();
  }

  public async deleteForeverAll() {
    const res = await this.UserRep.delete({});
    return (await this.walletService.deleteAll())
      ? res
      : ExceptionService.throwBadRequest();
  }

  public async saveUser(user: User) {
    return await this.UserRep.save(user);
  }
}
