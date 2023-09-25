export class PurchaseDto {
  buyer: string;
  seller: string;
  amount: number;
  token: string;
  commission?: number = 2.5;
}
