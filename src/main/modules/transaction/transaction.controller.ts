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

  @Post('/')
  async createTransaction(@Body() info: TransactionDto) {
    return this.transactionService.createOne(info);
  }

  @Get('/')
  async findAll() {
    return await this.transactionService.findAll();
  }

  @Get('/find-by-hash')
  async findByHash(@Query() hash: string) {
    return this.transactionService.findByHash(hash);
  }

  @Get('/find-by-timestamp')
  async findByTimestamp(@Query() timestamp: string) {
    return this.transactionService.findByTimestamp(timestamp);
  }

  @Get('/find-by-sender')
  async findBySender(@Query() sender: string) {
    return this.transactionService.findBySender(sender);
  }

  @Get('/find-by-receiver')
  async findByReceiver(@Query() receiver: string) {
    return this.transactionService.findByReceiver(receiver);
  }

  @Delete('/delete-permanently')
  async hardDeleteTransaction(@Query() hash: string) {
    return this.transactionService.deleteForever(hash);
  }
}
