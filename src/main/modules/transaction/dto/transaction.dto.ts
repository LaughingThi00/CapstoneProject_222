import { getCurrentInSeconds } from 'src/blockchain/utils/helper';

export enum TransactionType {
  DepositVND = 1, //bill, amount
  ChangeToken = 2, //byToken, forToken, byAmount,forAmount
  BuyCryptoDirect = 3, // bill, byToken, forToken, byAmount,forAmount

  TransferOutbound = 4, // token, amount, commission, hash
  TransferInbound = 5, // token, amount, commission
  WithdrawBlockchain = 6, //token, amount, commission, hash. [Just like TransferOutbound]
  WithdrawBanking = 7, //platformWithdraw, amount, commission
}

export class TransactionDto {
  type: TransactionType;
  timestamp?: number = getCurrentInSeconds();
  from_: string;
  to_: string;
  bill?: string = null;
  forToken?: string = null;
  forAmount?: number = null;
  byToken?: string = null;
  byAmount?: number = null;
  platformWithdraw?: string = null;
  commission?: number = 2.5;
  hash?: string = null;
}
