import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ExchangeAsset } from "./entities/exchange-asset.entity";
import { getPriceAsset, getPriceUSDTperVND } from "src/utils/marketdata";
import { CreateExchangeAssetDto } from "./dto/create-exchange-asset.dto";
import { WalletService } from "../wallet/wallet.service";

@Injectable()
export class ExchangeAssetService {
    constructor(
        @InjectRepository(ExchangeAsset)
        private exchangeAssetRep: Repository<ExchangeAsset>,
        private walletRep: WalletService,
    ) { }
    public async findHistory({
        userId,
        merchant
    }: {
        userId: string,
        merchant: string
    }) {
        const transactions = await this.exchangeAssetRep.find({
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
        // console.log('asset:', asset)
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
            const data = new CreateExchangeAssetDto
            data.userId = userId
            data.merchant = merchant
            data.type = "buy"
            data.asset = asset
            data.assetAmount = assetAmount
            data.fiat = "VND"
            data.fiatAmount = amountVND
            const result = this.exchangeAssetRep.create(data)
            await this.exchangeAssetRep.save(result)
            return result
        }

    }

    public async sell({
        userId,
        merchant,
        asset,
        assetAmount,
        slippage
    }: {
        userId: string,
        merchant: string,
        asset: string,
        assetAmount: number,
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
            let amountVND = 0

            if (asset == "USDT") {

                //check balance

                const price = await getPriceUSDTperVND()
                amountVND = assetAmount * Number(price)

                // Transfer from Exchange to HotWallet


                // Update user balance 
            }
            else {

                //check balance

                const priceUSDT = await getPriceUSDTperVND()
                const price = await getPriceAsset(asset + 'USDT')
                const bidPrice = price.bidPrice
                const bidPriceToVND = Number(bidPrice) * Number(priceUSDT)
                amountVND = assetAmount * bidPriceToVND
                // Transfer from Exchange to HotWallet


                // Update user balance 
            }
            const data = new CreateExchangeAssetDto
            data.userId = userId
            data.merchant = merchant
            data.type = "sell"
            data.asset = asset
            data.assetAmount = assetAmount
            data.fiat = "VND"
            data.fiatAmount = amountVND
            const result = this.exchangeAssetRep.create(data)
            await this.exchangeAssetRep.save(result)
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