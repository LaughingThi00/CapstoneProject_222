import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { WalletModule } from 'src/blockchain/modules/wallet/wallet.module';
import { UserModule } from '../user/user.module';
import { TransactionModule } from '../transaction/transaction.module';
import { CommonService } from 'src/main/service/CommonService';
import { BillModule } from '../bill/bill.module';
import { MerchantModule } from '../merchant/merchant.module';
import { CommonModule } from 'src/main/service/commonService.module';

@Module({
  imports: [
    WalletModule,
    UserModule,
    TransactionModule,
    BillModule,
    MerchantModule,
    CommonModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
