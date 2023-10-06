export class PurchaseDto {
  sender: string;
  receiver: string;
  byAmount: number;
  byToken?: string = 'VND';
  platformWithdraw?: string = null;
}
