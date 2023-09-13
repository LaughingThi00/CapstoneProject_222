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
import { NATIVECOINS } from 'src/constants/address';
import { TransferService } from './transfer.service';

@ApiTags("Transfer")
@Controller("/transfer")
export class TransferController {
    constructor(private readonly transferService: TransferService) { }
    @Get('history')
    async findTransaction(
        @Query('transactionHash') transactionHash: string,
    ) {
        const transactions = await this.transferService.findTransaction({
            transactionHash
        })
        if (!transactions || transactions.length == 0) return {
            data: transactions,
            message: "transaction is not found"
        }
        return transactions
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
        const nativeSymbol = NATIVECOINS[chainId];
        if (asset == nativeSymbol) {
            return this.transferService.createNativeTransfer({
                userId,
                merchant,
                chainId,
                toAddress,
                amount,
                asset
            })
        } else {
            return this.transferService.createTokenTransfer({
                userId,
                merchant,
                chainId,
                toAddress,
                amount,
                asset
            })
        }
    }
}