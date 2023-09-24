export class TransactionDto {
  hash: string;
  timestamp: string;
  platform?: string;
  from_: string;
  to_: string;
  token: string;
  amount: number;
  commission?: number;
}
