import { Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BuyAssetService } from "./buy-asset.service";

@ApiTags('Buy-Asset')
@Controller('/buy-asset')
export class BuyAssetController {
    constructor(private readonly buyAssetService: BuyAssetService) { }
    @Get('history')
    async findHistory(
        @Query('userId') userId: string,
        @Query('merchant') merchant: string) {
        const transactions = await this.buyAssetService.findHistory({ userId, merchant });
        if (!transactions || transactions.length == 0) {
            return []
        }
        return transactions;
    }
    @Post('buy')
    async buyAsset(
        @Query('userId') userId: string,
        @Query('merchant') merchant: string,
        @Query('asset') asset: string,
        @Query('amountVND') amountVND: number,
        @Query('slippage') slippage: number

    ) {
        return this.buyAssetService.buy({
            userId,
            merchant,
            asset,
            amountVND,
            slippage
        })
    }
    @Get('price-USDT')
    async priceUSDT() {
        return this.buyAssetService.getPriceUSDT()
    }
    @Get('price-asset')
    async priceAsset(
        @Query('symbol') symbol: string
    ) {
        return this.buyAssetService.getPriceToken(symbol)
    }
}