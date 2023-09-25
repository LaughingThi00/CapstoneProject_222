export class BuyCryptoDto {
  userId: string;
  merchant: string;
  amount_VND: number;
  for_token: string;
  bill: string;
  platform?: string = 'MOMO';
  slippage?: number = 5;
  commission?: number = 2.5;
}
