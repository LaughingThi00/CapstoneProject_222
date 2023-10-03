import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/main/modules/user/user.module';
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
    UserModule
  ],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule { }
