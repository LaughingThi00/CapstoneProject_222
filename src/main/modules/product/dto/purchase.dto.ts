export class PurchaseDto {
  merchant: string;
  merchantEncrypt?: any;
  sender: string; //userId
  receiver: string; //if kind of this transaction is transferOutbound or Withdraw: address. If not, userId
  byAmount: number;
  byToken?: string = 'VND';
  platformWithdraw?: string = null;
  commission?: number;
  gas?: number;
}
