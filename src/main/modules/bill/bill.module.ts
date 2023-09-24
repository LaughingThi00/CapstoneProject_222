import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { Bill } from './entities/bill.entity';
import { WalletModule } from 'src/blockchain/modules/wallet/wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bill]), WalletModule],
  controllers: [BillController],
  providers: [BillService],
  exports: [BillService],
})
export class BillModule {}
