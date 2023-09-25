export class FindTransactionDto {
  by: string;
  merchant?: string;
  userId?: string;
  hash?: string;
  receiver?: string;
  sender?: string;
}
