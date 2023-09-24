import { WalletService } from 'src/blockchain/modules/wallet/wallet.service';
import { BillService } from '../modules/bill/bill.service';
import { Injectable } from '@nestjs/common';
import { ExceptionService } from 'src/common/service/exception.service';

@Injectable()
export class CommonService {
  constructor(private billRep: BillService, private walletRep: WalletService) {}

  public async checkBalance(
    bill: string,
    amount_VND: number,
    platform: string,
  ) {
    //functions to check if system bank balance has received
    //an amount of money from the bill. If yes, return true.

    let check = false;

    try {
      const thisbill = await this.billRep.findOne(bill);
      if (thisbill) {
        console.log('Da tim thay bill:', thisbill);
        return false;
      }

      switch (platform) {
        case 'MOMO':
          //Check bill in MOMO platform
          check = true;
          break;

        case 'AGRIBANK':
          //Check bill in AGRIBANK platform
          check = true;
          break;

        case 'DONGABANK':
          //Check bill in DONGABANK platform
          check = true;
          break;

        case 'VNPAY':
          //Check bill in VNPAY platform
          check = true;
          break;

        case 'PAYPAL':
          //Check bill in PAYPAL platform
          check = true;
          break;

        default:
          break;
      }
      return check;
    } catch (error) {
      console.log('Error!!!!');
      return false;
    }
  }

  public async findSystemwallet() {
    return (
      this.walletRep.findOne('111') ??
      ExceptionService.throwInternalServerError()
    );
  }
}
