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
import { WalletService } from './wallet.service';

@ApiTags("Wallet")
@Controller("/wallet")
export class WalletController {
    constructor(private readonly walletService: WalletService) { }
    @Get('find-user')
    findUser(
        @Query('userId') userId: string,
        @Query('merchant') merchant: string
    ) {
        return this.walletService.findUser({
            userId,
            merchant
        })
    }
    @Post('create-wallet')
    createWallet(
        @Query('userId') userId: string,
        @Query('merchant') merchant: string
    ) {
        return this.walletService.createWallet({
            userId,
            merchant
        })
    }
}