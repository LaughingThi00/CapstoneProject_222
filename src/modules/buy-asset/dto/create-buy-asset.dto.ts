export class CreateBuyAssetDto {
    userId: string;
    merchant: string;
    type: string;
    asset: string;
    assetAmount: number;
    fiat: string;
    fiatAmount: number;
}
