import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { ExceptionService } from '../../../common/service/exception.service';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private TransactionRep: Repository<Transaction>,
  ) {}

  public async findByHash(info: string) {
    const transaction = await this.TransactionRep.findOne({ hash: info });

    return transaction ? transaction : null;
  }

  public async findByTimestamp(timestamp: number) {
    const transaction = await this.TransactionRep.find({ timestamp });

    return transaction ? transaction : null;
  }

  public async findBySender(from_: string) {
    const transaction = await this.TransactionRep.find({ from_ });

    return transaction ? transaction : null;
  }

  public async findByReceiver(to_: string) {
    const transaction = await this.TransactionRep.find({ to_ });

    return transaction ? transaction : null;
  }

  public async findAll() {
    const transactions = await this.TransactionRep.find();

    return transactions;
  }

  public async createOne(info: TransactionDto) {
    if (info?.hash)
      if (await this.TransactionRep.findOne({ hash: info?.hash }))
        return ExceptionService.throwBadRequest();

    const transaction = this.TransactionRep.create({
      ...info,
    });

    return await this.TransactionRep.save(transaction);
  }

  public async deleteForever(hash: string) {
    let transaction: Transaction = null;

    transaction = await this.TransactionRep.findOne(hash);

    if (!transaction) return ExceptionService.throwBadRequest();

    return await this.TransactionRep.remove(transaction);
  }

  public async deleteForeverAll() {
    return await this.TransactionRep.delete({});
  }
}
