import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';

@ApiTags('(Main)-Transaction')
@Controller('/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // @Post('/')
  // async createTransaction(@Body() info: TransactionDto) {
  //   return await this.transactionService.createOne(info);
  // }

  @Get('/')
  async findAll() {
    return await this.transactionService.findAll();
  }

  // @Get('/find-by-hash')
  // async findByHash(@Query() hash: string) {
  //   return await this.transactionService.findByHash(hash);
  // }

  // @Get('/find-by-timestamp')
  // async findByTimestamp(@Query() timestamp: string) {
  //   return await this.transactionService.findByTimestamp(timestamp);
  // }

  // @Get('/find-by-sender')
  // async findBySender(@Query() sender: string) {
  //   return await this.transactionService.findBySender(sender);
  // }

  // @Get('/find-by-receiver')
  // async findByReceiver(@Query() receiver: string) {
  //   return await this.transactionService.findByReceiver(receiver);
  // }

  // @Delete('/delete-permanently')
  // async hardDeleteTransaction(@Query() hash: string) {
  //   return await this.transactionService.deleteForever(hash);
  // }
  @Delete('/delete-permanently-all')
  async hardDeleteAll() {
    return await this.transactionService.deleteForeverAll();
  }
}
