export class ChangeTokenDto {
  userId: string;
  merchantEncrypt?: string;
  merchant?: string;
  address?: string;
  amount: number;
  byToken: string;
  forToken: string;
  commission?: number;
  gas?: number;
}
