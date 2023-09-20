import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BuyAsset } from "./entities/buy-asset.entity";
import { getPriceAsset, getPriceUSDTperVND } from "src/utils/marketdata";
import { CreateBuyAssetDto } from "./dto/create-buy-asset.dto";
import { WalletService } from "../wallet/wallet.service";

@Injectable()
export class BuyAssetService {
    constructor(
        @InjectRepository(BuyAsset)
        private buyAssetRep: Repository<BuyAsset>,
        private walletRep: WalletService,
    ) { }
    public async findHistory({
        userId,
        merchant
    }: {
        userId: string,
        merchant: string
    }) {
        const transactions = await this.buyAssetRep.find({
            where: {
                userId: userId,
                merchant: merchant
            }
        })
        return transactions

    }
    public async buy({
        userId,
        merchant,
        asset,
        amountVND,
        slippage
    }: {
        userId: string,
        merchant: string,
        asset: string,
        amountVND: number,
        slippage: number
    }) {
        const users = await this.walletRep.findUser({
            userId: userId,
            merchant: merchant,
        });
        if (users.length == 0) {
            return {
                message: 'user is not found',
            };
        } else {
            let assetAmount = 0
            if (asset == "USDT") {
                const price = await getPriceUSDTperVND()
                assetAmount = amountVND / Number(price)

                // Transfer from Exchange to HotWallet


                // Update user balance 
            }
            else {
                const priceUSDT = await getPriceUSDTperVND()
                const price = await getPriceAsset(asset + 'USDT')
                const askPrice = price.askPrice
                const askPriceToVND = Number(askPrice) * Number(priceUSDT)
                assetAmount = amountVND / askPriceToVND
                // Transfer from Exchange to HotWallet


                // Update user balance 
            }
            const data = new CreateBuyAssetDto
            data.userId = userId
            data.merchant = merchant
            data.type = ""
            data.asset = asset
            data.assetAmount = assetAmount
            data.fiat = "VND"
            data.fiatAmount = amountVND
            const result = this.buyAssetRep.create(data)
            await this.buyAssetRep.save(result)
            return result
        }

    }

    public async getPriceUSDT() {
        return getPriceUSDTperVND()
    }
    public async getPriceToken(symbol: string) {
        return getPriceAsset(symbol)
    }
}