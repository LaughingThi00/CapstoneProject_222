const Bill = require("../models/Bill");

const checkBalance = (bill,amount_VND, platform) => {
  //functions to check if system bank balance has received
  //an amount of money from the bill. If yes, return true.

  let check = false;
  switch (platform) {
    case "MOMO":
      //Check bill in MOMO platform
      check = true;
      break;

    case "AGRIBANK":
      //Check bill in AGRIBANK platform
      check = true;
      break;

    case "DONGABANK":
      //Check bill in DONGABANK platform
      check = true;
      break;

    case "VNPAY":
      //Check bill in VNPAY platform
      check = true;
      break;

    case "PAYPAL":
      //Check bill in PAYPAL platform
      check = true;
      break;

    default:
      break;
  }

  return !check || Bill.findOne({ id: bill, partner:platform }) ? false : true;
};

module.exports = { checkBalance };
