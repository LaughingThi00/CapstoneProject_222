import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepositService } from './deposit.service';

@ApiTags('Deposit')
@Controller('/deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) { }
  @Get('history')
  async findHistory(
    @Query('userId') userId: string,
    @Query('merchant') merchant: string,
  ) {
    const transactions = await this.depositService.findHistory({
      userId,
      merchant,
    });
    return transactions;
  }
}
