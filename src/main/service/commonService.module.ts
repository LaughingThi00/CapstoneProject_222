import { Module } from '@nestjs/common';
import { WalletModule } from 'src/blockchain/modules/wallet/wallet.module';
import { BillModule } from '../modules/bill/bill.module';
import { CommonService } from './CommonService';

@Module({
  imports: [WalletModule, BillModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
