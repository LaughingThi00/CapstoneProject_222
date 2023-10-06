export class BuyCryptoDto {
  userId: string;
  merchant: string;
  amountVND: number;
  forToken: string;
  bill: string;
  platform?: string = 'MOMO';
  // commission?: number = 2.5;
}
