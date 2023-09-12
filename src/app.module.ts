import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TestModule } from './modules/test-module/test.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { TransferModule } from './modules/transfer/transfer.module';


@Module({
  imports: [
    // Config .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Cronjob
    ScheduleModule.forRoot(),

    // Config typeorm
    TypeOrmModule.forRoot({
      type: 'mongodb',
      // host: process.env.MONGO_HOST,
      // port: +process.env.MONGO_PORT,
      // username: process.env.MONGO_USERNAME,
      // password: process.env.MONGO_PASSWORD,
      // database: process.env.MONGO_DATABASE,
      url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.r2ufcpu.mongodb.net/`,
      autoLoadEntities: true,
      synchronize: true,
      entities: [],
      extra: { authSource: 'admin' },
    }),
    // MongooseModule.forRoot(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.r2ufcpu.mongodb.net/?retryWrites=true&w=majority`),
    TestModule,
    WalletModule,
    TransferModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
