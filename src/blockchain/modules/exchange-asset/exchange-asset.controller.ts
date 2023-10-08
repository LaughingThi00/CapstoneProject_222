import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExchangeAssetService } from './exchange-asset.service';

@ApiTags('Exchange-Asset')
@Controller('/exchange-asset')
export class ExchangeAssetController {
  constructor(private readonly exchangeAssetService: ExchangeAssetService) { }
  @Get('history')
  async findHistory(
    @Query('userId') userId: string,
    @Query('merchant') merchant: string,
  ) {
    const transactions = await this.exchangeAssetService.findHistory({
      userId,
      merchant,
    });
    if (!transactions || transactions.length == 0) {
      return [];
    }
    return transactions;
  }
  @Post('buy')
  async buyAsset(
    @Query('userId') userId: string,
    @Query('merchant') merchant: string,
    @Query('asset') asset: string,
    @Query('amountVND') amountVND: number,
    @Query('slippage') slippage: number,
  ) {
    return this.exchangeAssetService.buy({
      userId,
      merchant,
      asset: asset.toLocaleUpperCase(),
      amountVND,
      slippage,
    });
  }

  @Post('sell')
  async sellAsset(
    @Query('userId') userId: string,
    @Query('merchant') merchant: string,
    @Query('asset') asset: string,
    @Query('assetAmount') assetAmount: number,
    @Query('slippage') slippage: number,
  ) {
    return this.exchangeAssetService.sell({
      userId,
      merchant,
      asset: asset.toLocaleUpperCase(),
      assetAmount,
      slippage,
    });
  }

  @Get('price-USDT')
  async priceUSDT() {
    return this.exchangeAssetService.getPriceUSDT();
  }
  @Get('price-token')
  async priceToken(@Query('symbol') symbol: string) {
    return this.exchangeAssetService.getPriceToken(symbol.toLocaleUpperCase());
  }
  @Get('change-asset')
  async priceAsset(
    @Query('tokenIn') tokenIn: string,
    @Query('tokenOut') tokenOut: string,
    @Query('amountIn') amountIn: number,) {
    return this.exchangeAssetService.exchangeToken({ tokenIn, tokenOut, amountIn })
  }
}
