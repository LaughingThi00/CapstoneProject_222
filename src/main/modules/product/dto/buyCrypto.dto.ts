export class BuyCryptoDto {
  userId: string;
  merchantEncrypt?: string;
  merchant: string;
  amountVND: number;
  forToken: string;
  bill: string;
  platform?: string = 'MOMO';
  commission?: number;
  gas?: number;
}
