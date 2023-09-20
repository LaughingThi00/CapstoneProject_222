import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletModule } from "../wallet/wallet.module";
import { BuyAssetController } from "./buy-asset.controller";
import { BuyAssetService } from "./buy-asset.service";
import { BuyAsset } from "./entities/buy-asset.entity";

@Module({
    imports: [TypeOrmModule.forFeature([BuyAsset]), WalletModule],
    controllers: [BuyAssetController],
    providers: [BuyAssetService],
    exports: [BuyAssetService],
})
export class BuyAssetModule { }