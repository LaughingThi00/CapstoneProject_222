const express = require("express");
const router = express.Router();
const axios = require("axios");

const Merchant = require("./../models/Merchant");
const User = require("./../models/User");
const {
  findListUserAddress,
  findListMerchantAddress,
} = require("../service/TransformData");
const Url = require("./../constants/constant");
const { checkBalance } = require("../service/Check");
//! Not RSA yet. Merchant's Admin have more powerful rights to delete, transfer, ...

// @route GET endpoint/user
// @desc Get all user infomation of an merchant
// @access Private

router.get("/price", async (req, res) => {
  try {
    response1 = await axios.get(
      'https://api.binance.com/api/v3/ticker/price?symbols=["BNBUSDT","ETHUSDT","BTCUSDT"]'
    );

    response2 = await axios.get(
      "https://api.apilayer.com/fixer/latest?base=USD&symbols=VND",
      {
        headers: {
          apiKey: "IKZ11s36ZMp1fbYqP1M4tgv2ROIQGDHj",
        },
      }
    );
    if (response1.data && response2.data) {
      let price = [];
      const base_VND = response2.data.rates.VND;

      response1.data.forEach((item) => {
        switch (item.symbol) {
          case "BTCUSDT":
            price.push({ name: "BTC", price: base_VND * item.price });
            break;
          case "ETHUSDT":
            price.push({ name: "ETH", price: base_VND * item.price });
            break;
          case "BNBUSDT":
            price.push({ name: "BNB", price: base_VND * item.price });
            break;
        }
      });
      price.push({ name: "USDT", price: base_VND });
      return res.status(200).json({
        success: true,
        message: "Excellent process!",
        price,
      });

    } else {
      return res
      .status(500)
      .json({ success: false, message: "We catch an error hihihihihi" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "We catch an error huhuhuhuh" });
  }
});

router.post("/", async (req, res) => {
  //* RSA, n-crypt start/end

  const { merchant } = req.body;

  try {
    const users = await User.find({ merchant });
    if (users.length) {
      res.status(200).json({
        success: true,
        message: `We found ${users.length} users of this merchant.`,
        users,
      });
    } else
      res.status(404).json({
        success: false,
        message: "No user found. Please try again with another partner code!",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
});

// @route GET endpoint/user
// @desc Get all user infomation of an merchant
// @access Private

router.post("/find-user-wallet", async (req, res) => {
  //* RSA, n-crypt start/end

  const { id, merchant } = req.body;

  try {
    const user = await User.findOne({ id, merchant });
    if (user) {
      res.status(200).json({
        success: true,
        message: "Excellent project!",
        user,
      });
    } else
      res.status(404).json({
        success: false,
        message: `We didn't found any user with your information. Have you created wallet for this user already?.`,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
});

// @route GET endpoint/create-wallet
// @desc create wallet for one user of one merchant, with or without mode
// @access Private

router.post("/create-wallet", async (req, res) => {
  //* RSA, n-crypt start/end

  const { merchant, id } = req.body;

  try {
    if (!(await Merchant.findOne({ partner_code: merchant })))
      throw new Error("Merchant not found");
    if (await User.findOne({ id }))
      throw new Error("User already exists");

    const result = await axios.post(`${Url.apiBackEndUrl}/user`, {
      merchant,
      id
    });
    if (!result.data.success) throw new Error(result.data.message);
    res.status(200).json({
      success: true,
      message: "Excellent process!",
      user: result.data.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
});

// @route GET endpoint/transaction
// @desc find transaction list of a user or a merchant's user list
// @access Private

router.get("/transaction", async (req, res) => {
  //* RSA, n-crypt start/end

  const { merchant,id } = req.body;

  try {
    if (!(await Merchant.findOne({ partner_code: merchant })))
      throw new Error("Merchant not found");
    if (id) {
      //find transaction of a user
      const user = await User.findOne({ id, merchant });
      if (!user) throw new Error("User not exists");

      let result = await axios.get(`${Url.apiBackEndUrl}/transaction`);

      if (!result.data.success) {
        res.status(404).json({
          success: false,
          message: "Something went wrong!",
        });
      } else {
        addressUser = findListUserAddress(user);

        result = result.data.transactions.filter(
          (item) =>
            addressUser.includes(item.from_address) ||
            addressUser.includes(item.to_address)
        );
      }
      res.status(200).json({
        success: true,
        message: "Excellent process!",
        transactions: result,
      });
    } else {
      //find transaction of all users of a merchant
      let result = await axios.get(`${Url.apiBackEndUrl}/transaction`);
      if (!result.data.success)
        res.status(404).json({
          success: false,
          message: "Something went wrong! hihihi",
        });
      else {
        const user = await User.find({ merchant });
        addressUser = findListMerchantAddress(user, merchant);
        result = result.data.transactions.filter(
          (item) =>
            addressUser.includes(item.from_address) ||
            addressUser.includes(item.to_address)
        );
      }
      res.status(200).json({
        success: true,
        message: "Excellent process!",
        transactions: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
});

// @route PUT endpoint/buy-crypto
// @desc buy crypto for a user
// @access Private

router.post("/buy-crypto", async (req, res) => {
  const {
    id,    
    merchant,
    amount_VND,
    for_token,
    network,
    bill,
    platform,
    slippage,
  } = req.body;
  try {
    const checkBillResult=await checkBalance(bill, amount_VND, platform);
  if (!checkBillResult )
    return res.status(401).json({
      success: false,
      message:
        "~~~~User have not send VND for us or catch a mistake when verifying your information",
    });
  else{
    const responseBill= await axios.post(`${Url.apiBackEndUrl}/bill`,{  bill,partner:platform});
    if(!responseBill.data.success) {
      console.log("Xay ra loi")
      return res.status(401).json({
        success: false,
        message:
          "~~~~User have not send VND for us or catch a mistake when verifying your information",
      });
    }
  }
    const updateSysBalance = await axios.put(
      `${Url.apiBackEndUrl}/systemwallet/update-balance`,
      {
        address: platform,
        token: "VND",
        type: "+",
        amount: amount_VND,
      }
    );

    if (!updateSysBalance.data.success)
      res.status(400).json({ success: false, message: "Catch error!" });

    const result = await axios.post(`${Url.apiBlockChainUrl}/buy/buy-crypto`, {
      userId:id,      
      merchant,
      amount_VND,
      for_token,
      chainId: 97,
      slippage,
    });

    if (!result.data.success)
      res.status(401).json({
        success: false,
        message:
          "We catch an error when trying to buy token in blockchain server.",
      });
    res.status(200).json({ success: true, message: "Exellent process!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
});

// @route PUT endpoint/purchase
// @desc user pay for a goods with crypto
// @access Private

router.put("/purchase", async (req, res) => {
  const { id, merchant, to_address, token, amount, network=97 } =
    req.body;
  try {
    const result = await axios.post(`${Url.apiBlockChainUrl}/transaction/transfer`, {
      userId:id,
      merchant,
      toAddress: to_address,
      asset: token,
      amount,
      chainId: network,
    });

    if (result.data.success)
      res.status(200).json({
        success: true,
        message: "Successful purchase!",
        transaction: result.data.transaction,
      });
    else
      res.status(400).json({
        success: false,
        message: "Failed purchase!",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
});

module.exports = router;
