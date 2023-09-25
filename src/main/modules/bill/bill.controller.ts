import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BillService } from './bill.service';

@ApiTags('(Main)-Bill')
@Controller('/bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post('/')
  async createBill(@Query() id_: string, @Query() platform: string) {
    return await this.billService.createOne({ id_, platform });
  }

  @Get('/')
  async findAllBill() {
    return await this.billService.findAll();
  }

  @Get('/')
  async findOneBill(@Query() id_: string) {
    return await this.billService.findOne(id_);
  }

  @Put('/delete-bill')
  async softDeleteBill(@Query() id_: string) {
    return await this.billService.deleteBill(id_);
  }

  @Put('/recover-bill')
  async recoverBill(@Query() id_: string) {
    return await this.billService.recoverBill(id_);
  }

  @Delete('/delete-permanently')
  async hardDeleteBill(@Query() id_: string) {
    return await this.billService.deleteForever(id_);
  }
}
