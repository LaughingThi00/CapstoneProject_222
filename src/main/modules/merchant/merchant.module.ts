import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { Merchant } from './entities/merchant.entity';
import { WalletModule } from 'src/blockchain/modules/wallet/wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Merchant]), WalletModule],
  controllers: [MerchantController],
  providers: [MerchantService],
  exports: [MerchantService],
})
export class MerchantModule {}
