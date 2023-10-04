export class BuyCryptoDto {
  userId: string;
  merchant: string;
  amountVND: number;
  for_token: string;
  bill: string;
  platform?: string = 'MOMO';
  slippage?: number = 5;
  commission?: number = 2.5;
}
