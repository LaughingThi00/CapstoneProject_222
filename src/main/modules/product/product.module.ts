import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UserModule } from '../user/user.module';
import { TransactionModule } from '../transaction/transaction.module';
import { BillModule } from '../bill/bill.module';
import { MerchantModule } from '../merchant/merchant.module';
import { CommonModule } from 'src/main/service/commonService.module';
import { ExchangeAssetModule } from 'src/blockchain/modules/exchange-asset/exchange-asset.module';
import { TransferModule } from 'src/blockchain/modules/transfer/transfer.module';

@Module({
  imports: [
    BillModule,
    MerchantModule,
    CommonModule,
    UserModule,
    TransactionModule,
    ExchangeAssetModule,
    TransferModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
