import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from '../wallet/wallet.module';
import { ExchangeAssetController } from './exchange-asset.controller';
import { ExchangeAssetService } from './exchange-asset.service';
import { ExchangeAsset } from './entities/exchange-asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeAsset]), WalletModule],
  controllers: [ExchangeAssetController],
  providers: [ExchangeAssetService],
  exports: [ExchangeAssetService],
})
export class ExchangeAssetModule {}
