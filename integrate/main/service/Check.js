const Url = require("../constants/constant");
const Bill = require("../models/Bill");

const checkBalance = async (bill,amount_VND, platform) => {
  //functions to check if system bank balance has received
  //an amount of money from the bill. If yes, return true.
 
  
  let check = false;

  try {
    const thisbill=await Bill.findOne({ id: bill, partner:platform });
    if (thisbill)
    {
      console.log("Da tim thay bill:",thisbill)
      return false;
    } 

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
     return !check  ? false : true;
  } catch (error) {
    console.log("Error!!!!")
    return false;
  }
 

  
};

module.exports = { checkBalance };
