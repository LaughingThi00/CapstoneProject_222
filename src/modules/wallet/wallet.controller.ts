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
    async findUser(
        @Query('userId') userId: string,
        @Query('merchant') merchant: string
    ) {
        const users = await this.walletService.findUser({
            userId,
            merchant
        })
        if (!users || users.length == 0) return {
            data: users,
            message: "user is not found"
        }
        return users
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