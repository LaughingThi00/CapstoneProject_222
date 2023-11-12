export enum TransactionType {
  DepositVND = 'deposit-vnd', //1. bill, amount
  ChangeToken = 'change-token', //2. byToken, forToken, byAmount,forAmount
  BuyCryptoDirect = 'buy-crypto-direct', //3. bill, byToken, forToken, byAmount,forAmount
  TransferOutbound = 'transfer-outbound', //4. token, amount, commission, hash
  TransferInbound = 'transfer-inbound', //5. token, amount, commission
  DepositBlockchain = 'deposit-blockchain', //6.
  TransferBanking = 'transfer-banking', //7. platformWithdraw, amount, commission
}

export class TransactionDto {
  type: TransactionType;
  timestamp?: number;
  from_: string;
  to_: string;
  bill?: string = null;
  forToken?: string = null;
  forAmount?: number = null;
  byToken?: string = null;
  byAmount?: number = null;
  platformWithdraw?: string = null;
  commission?: number;
  gas?: number;
  hash?: string = 'null';
}
