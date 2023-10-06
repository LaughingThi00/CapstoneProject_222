export class ChangeTokenDto {
  userId: string;
  merchant?: string;
  address?: string;
  amount: number;
  byToken: string;
  forToken: string;
}
