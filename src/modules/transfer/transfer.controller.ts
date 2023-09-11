import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransferService } from './transfer.service';

@ApiTags("Transfer")
@Controller("/transfer")
export class TransferController {
    constructor(private readonly transferService: TransferService) { }
    @Get('history')
    findUser(
        @Query('transactionHash') transactionHash: string,
    ) {
        return this.transferService.findTransaction({
            transactionHash
        })
    }
    @Post('create-transfer')
    createTransfer(
        @Query('userId') userId: string,
        @Query('merchant') merchant: string,
        @Query('chainId') chainId: number,
        @Query('toAddress') toAddress: string,
        @Query('amount') amount: number,
        @Query('asset') asset: string,
    ) {
        return this.transferService.createTransfer({
            userId,
            merchant,
            chainId,
            toAddress,
            amount,
            asset
        })
    }
}