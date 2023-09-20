export class CreateTransferDto {
  userId: string;
  merchant: string;
  chainId: number;
  toAddress: string;
  amount: number;
  asset: string;
}
