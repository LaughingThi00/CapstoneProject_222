import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationsModule } from '../configurations/configurations.module';
import { Configuration } from '../configurations/entities/configuration.entity';
import { WalletModule } from '../wallet/wallet.module';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { Deposit } from './entities/deposit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deposit]),
    WalletModule,
    ConfigurationsModule,
  ],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
