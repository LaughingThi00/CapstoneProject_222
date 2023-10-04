export class PurchaseDto {
  buyer: string;
  seller: string;
  amount: number;
  by_token?: string = 'VND';
  for_token: string;
  commission?: number = 2.5;
}
