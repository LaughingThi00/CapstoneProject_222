import { Param, Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { BuyCryptoDto } from './dto/buyCrypto.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { MerchantCustomDto } from '../merchant/dto/merchantCustom.dto';
import { DepositVNDDto } from './dto/depositVND.dto';
import { ChangeTokenDto } from './dto/changeToken.dto';

@ApiTags('(Main)-Product')
@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
    //
  }

  @Post('/init-partner')
  async createMerchant(@Body() { partner_code, name }: MerchantCustomDto) {
    return await this.productService.createMerchant(partner_code, name);
  }

  @Post('/create-user/:merchant/:userId')
  async createUser(
    @Param('merchant') merchant: string,
    @Param('userId') userId: string,
  ) {
    return await this.productService.createUser(merchant, userId);
  }

  @Get('/price/:merchant')
  async getPrice(@Param('merchant') merchant: string) {
    return await this.productService.getPrice();
  }

  @Get('/user-list/:merchant')
  async findUserList(@Param('merchant') merchant: string) {
    return await this.productService.findUserList(merchant);
  }

  @Get('/user-info/:merchant/:user')
  async findUserWallet(
    @Param('merchant') merchant: string,
    @Param('user') userId: string,
  ) {
    return await this.productService.findUserInfo(userId);
  }

  @Get('/transactions/:merchant')
  async findTransaction(@Param('merchant') merchant: string) {
    return await this.productService.findTransaction({
      by: 'merchant',
      merchant,
    });
  }

  @Get('/transactions/:merchant/:userId')
  async findTransactionByUserId(
    @Param('merchant') merchant: string,
    @Param('userId') userId: string,
  ) {
    return await this.productService.findTransaction({
      by: 'userId',
      merchant,
      userId,
    });
  }

  @Put('/deposit-vnd/:merchant')
  async depositVND(
    @Param('merchant') merchant: string,
    @Body() { userId, amountVND, bill, platform }: DepositVNDDto,
  ) {
    return await this.productService.depositVND({
      userId,
      merchant,
      amountVND: Number(amountVND),
      bill,
      platform,
    });
  }

  @Put('/change-token/:merchant')
  async changeTokenController(
    @Param('merchant') merchant: string,
    @Body()
    { userId, address, amount, byToken, forToken }: ChangeTokenDto,
  ) {
    return await this.productService.changeToken({
      userId,
      merchant,
      address,
      amount: Number(amount),
      byToken,
      forToken,
    });
  }

  @Put('/buy-crypto-direct/:merchant')
  async buyCryptoDirectController(
    @Param('merchant') merchant: string,
    @Body()
    { userId, amountVND, forToken, bill, platform }: BuyCryptoDto,
  ) {
    return await this.productService.buyCrypto({
      userId,
      merchant,
      amountVND: Number(amountVND),
      forToken,
      bill,
      platform,
    });
  }

  @Put('/transfer-inbound/:merchant')
  async transferInboundController(
    @Param('merchant') merchant: string,
    @Body()
    { sender, receiver, byAmount, byToken }: PurchaseDto,
  ) {
    return await this.productService.transferInbound({
      merchant,
      sender,
      receiver,
      byAmount: Number(byAmount),
      byToken,
    });
  }

  @Put('/transfer-outbound/:merchant')
  async transferOutboundController(
    @Param('merchant') merchant: string,
    @Body()
    { sender, receiver, byAmount, byToken }: PurchaseDto,
  ) {
    return await this.productService.transferOutbound({
      merchant,
      sender,
      receiver,
      byAmount: Number(byAmount),
      byToken,
    });
  }

  @Put('/transfer-banking/:merchant')
  async transferBankingController(
    @Param('merchant') merchant: string,
    @Body()
    { sender, receiver, byAmount, platformWithdraw }: PurchaseDto,
  ) {
    return await this.productService.transferBanking({
      merchant,
      sender,
      receiver,
      byAmount: Number(byAmount),
      platformWithdraw,
    });
  }
}
