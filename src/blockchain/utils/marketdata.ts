import axios from 'axios';
import { FEE_SYSTEM } from '../constants/fee';
import { BSC_API_KEY } from '../constants/network';

export async function getPriceUSDTperVND() {
    const url = 'https://www.okx.com/v2/market/rate/getRateByRateName/usd_vnd?t=1695195675703'
    try {
        const response = await axios.get(url, {})
        if (response) {
            return response.data.data[0].rateParities;
        } else {
            return [];
        }

    } catch (error) {
        console.log('Request error:', error);
        return [];
    }
}

export async function getPriceAsset(symbol: string) {
    const url = 'https://www.binance.com/api/v1/ticker/bookTicker'
    try {
        const response = await axios.get(`${url}?symbol=${symbol}`)
        if (response) {
            const price = response.data
            return price
        } else {
            return [];
        }
    } catch (error) {
        console.log('Request error:', error);
        return [];
    }
}

export async function getPriceTokenToVND(token: string) {
    token = token.toLocaleUpperCase()
    if (token == "VND") return 1;
    else {
        const asset = token + "USDT"
        const priceAsset = await getPriceAsset(asset)
        const priceUSD = await getPriceUSDTperVND()
        const price = priceAsset.askPrice * priceUSD
        return price
    }

}

export async function getGasFee(gasLimit: number) {
    const url = `https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey=${BSC_API_KEY}`;
    try {
        const response = await axios.get(url)
        if (response) {
            const gasPrice = response.data.result.FastGasPrice;
            const valueBNB = response.data.result.UsdPrice;
            const rateUSD = await getPriceUSDTperVND()
            const fee = gasPrice * 2 * valueBNB * rateUSD * gasLimit / 1000000000
            return fee
        } else {
            return 5;
        }
    } catch (error) {
        console.log('Request error:', error);
        return 5;
    }
}
export async function feeEstimate(asset: string, amount: number) {
    // const gasFee = await getGasFee(gasLimit);
    // return gasFee
    const priceAsset = await getPriceTokenToVND(asset)
    const commission = priceAsset * FEE_SYSTEM * amount
    const gas = 500
    return commission + gas
}
