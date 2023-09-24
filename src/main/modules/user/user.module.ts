import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { WalletModule } from 'src/blockchain/modules/wallet/wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), WalletModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
