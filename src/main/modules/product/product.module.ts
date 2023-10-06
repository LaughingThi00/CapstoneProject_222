import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UserModule } from '../user/user.module';
import { TransactionModule } from '../transaction/transaction.module';
import { CommonService } from 'src/main/service/CommonService';
import { BillModule } from '../bill/bill.module';
import { MerchantModule } from '../merchant/merchant.module';
import { CommonModule } from 'src/main/service/commonService.module';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BillModule,
    MerchantModule,
    CommonModule,
    // TypeOrmModule.forFeature([User]),
    UserModule,
    TransactionModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
