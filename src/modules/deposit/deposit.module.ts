import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Configuration } from "../configurations/entities/configuration.entity";
import { WalletModule } from "../wallet/wallet.module";
import { DepositService } from "./deposit.service";
import { Deposit } from "./entities/deposit.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Deposit]),
        WalletModule,
        Configuration
    ],
    providers: [DepositService],
})
export class DepositModule { }