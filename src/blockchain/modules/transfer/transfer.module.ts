import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/main/modules/user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { Transfer } from './entities/transfer.entity';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer]), WalletModule, UserModule],
  controllers: [TransferController],
  providers: [TransferService],
  exports: [TransferService],
})
export class TransferModule { }
