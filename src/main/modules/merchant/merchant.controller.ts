import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MerchantService } from './merchant.service';

@ApiTags('(Main)-Merchant')
@Controller('/merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post('/')
  async createMerchant(@Query() partner_code: string, @Query() name: string) {
    return this.merchantService.createOne({ partner_code, name });
  }

  @Get('/find-one-deleted')
  async findOneDeleted(@Query() partner_code: string) {
    return await this.merchantService.findOne({ partner_code, isDead: true });
  }

  @Get('/find-one')
  async findOne(@Query() partner_code: string) {
    return await this.merchantService.findOne({ partner_code, isDead: false });
  }

  @Get('/')
  async findAll() {
    return await this.merchantService.findAll();
  }

  @Get('/find-all')
  async findExistingAndDeleted() {
    return await this.merchantService.findAllAndDead();
  }

  @Put('/change-info')
  async changeInfo(@Query() partner_code: string, @Query() name: string) {
    return this.merchantService.changeInfo({ partner_code, name });
  }

  @Put('/delete-merchant')
  async softDeleteMerchant(@Query() partner_code: string) {
    return this.merchantService.deleteOne(partner_code);
  }

  @Put('/recover-merchant')
  async recoverMerchant(@Query() partner_code: string) {
    return this.merchantService.recoverOne(partner_code);
  }

  @Delete('/delete-permanently')
  async hardDeleteMerchant(@Query() partner_code: string) {
    return this.merchantService.deleteForever(partner_code);
  }
}
