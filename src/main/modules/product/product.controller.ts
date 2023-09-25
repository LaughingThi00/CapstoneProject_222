import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { BuyCryptoDto } from './dto/buyCrypto.dto';
import { PurchaseDto } from './dto/purchase.dto';

@ApiTags('(Main)-Product')
@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
    //
  }

  @Post('/init-partner')
  async createMerchant(
    @Body() { partner_code, name }: { partner_code: string; name: string },
  ) {
    return await this.productService.createMerchant(partner_code, name);
  }

  @Post('/create-user')
  async createUser(
    @Body() { merchant, userId }: { merchant: string; userId: string },
  ) {
    return await this.productService.createUser(merchant, userId);
  }

  @Get('/price')
  async getPrice() {
    return await this.productService.getPrice();
  }

  @Get('/user-list')
  async findUserList(@Body() { partner_code }: { partner_code: string }) {
    return await this.productService.findUserList(partner_code);
  }

  @Get('/user-info')
  async findUserWallet(@Body() { userId }: { userId: string }) {
    return await this.productService.findUserInfo(userId);
  }

  @Get('/transactions')
  async findTransaction(@Body() { merchant }: { merchant: string }) {
    return await this.productService.findTransaction({
      by: 'merchant',
      merchant,
    });
  }

  @Put('/buy-crypto')
  async buyCrypto(
    @Body()
    {
      userId,
      merchant,
      amount_VND,
      for_token,
      bill,
      platform,
      slippage,
      commission,
    }: BuyCryptoDto,
  ) {
    return await this.productService.buyCrypto({
      userId,
      merchant,
      amount_VND,
      for_token,
      bill,
      platform,
      slippage,
      commission,
    });
  }

  @Put('/purchase')
  async purchase(
    @Body() { buyer, seller, amount, token, commission }: PurchaseDto,
  ) {
    return await this.productService.purchase({
      buyer,
      seller,
      amount,
      token,
      commission,
    });
  }

  @Put('/deposit-vnd')
  async depositVND() {
    //
  }
}
