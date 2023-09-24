import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entities/bill.entity';
import { ExceptionService } from '../../../common/service/exception.service';
import { BillDto } from './dto/Bill.dto';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private BillRep: Repository<Bill>,
  ) {}

  public async findOne(id_: string) {
    const bill = await this.BillRep.findOne({
      id_,
      isDeleted: false,
    });

    return bill ? bill : null;
  }

  public async findAll() {
    const bills = await this.BillRep.find({ isDeleted: false });

    return bills;
  }

  public async findDead() {
    const bills = await this.BillRep.find({ isDeleted: true });

    return bills;
  }

  public async findAllAndDead() {
    const bills = await this.BillRep.find();

    return bills;
  }

  public async createOne(info: BillDto) {
    if (await this.BillRep.findOne({ id_: info.id_ }))
      return ExceptionService.throwBadRequest();

    const bill = this.BillRep.create({
      ...info,
    });

    return await this.BillRep.save(bill);
  }

  public async deleteBill(id_: string) {
    let bill: Bill = null;

    bill = await this.BillRep.findOne({
      id_,
    });

    if (!bill || bill.isDeleted === true)
      return ExceptionService.throwBadRequest();

    bill.isDeleted = true;

    return await this.BillRep.save(bill);
  }

  public async recoverBill(id_: string) {
    let bill: Bill = null;

    bill = await this.BillRep.findOne({
      id_,
    });

    if (!bill || bill.isDeleted === false)
      return ExceptionService.throwBadRequest();

    bill.isDeleted = true;

    return await this.BillRep.save(bill);
  }

  public async deleteForever(id_: string) {
    let bill: Bill = null;

    bill = await this.BillRep.findOne({
      id_,
    });

    if (!bill) return ExceptionService.throwBadRequest();

    return await this.BillRep.remove(bill);
  }
}
