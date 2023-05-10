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

router.get("/user", async (req, res) => {
  //* RSA, n-crypt start/end

  const { merchant } = req.body;

  try {
    const users = await User.find({ merchant });
    console.log(users);
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

// @route GET endpoint/create-wallet
// @desc create wallet for one user of one merchant, with or without mode
// @access Private

router.post("/create-wallet", async (req, res) => {
  //* RSA, n-crypt start/end

  const { merchant, userId, mode } = req.body;

  try {
    if (!(await Merchant.findOne({ partner_code: merchant })))
      throw new Error("Merchant not found");
    if (await User.findOne({ id: userId }))
      throw new Error("User already exists");

    const result = await axios.post(`${Url.apiBackEndUrl}/user`, {
      merchant,
      userId,
      mode,
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

  const { merchant, userId } = req.body;

  try {
    if (!(await Merchant.findOne({ partner_code: merchant })))
      throw new Error("Merchant not found");
    if (userId) {
      //find transaction of a user
      const user = await User.findOne({ id: userId, merchant });
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
        console.log("USERLIST LA:", user);
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

router.put("/buy-crypto", async (req, res) => {
  const {
    userId,
    merchant,
    amount_VND,
    for_token,
    network,
    bill,
    platform,
    slippage,
  } = req.body;
  if (!checkBalance(bill, amount_VND, platform))
    res.status(401).json({
      success: false,
      message:
        "User have not send VND for us or catch a mistake when verifying your information",
    });
  try {
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

    const result = await axios.post(`${Url.apiBlockChainUrl}/buy-crypto`, 
    {
      userId,
      merchant,
      amount_VND,
      for_token,
      chainId: network,
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
  const { from_address, to_address, token, amount, network, merchant } =
    req.body;
  try {
    transaction
    const result = await axios.put(`${Url.apiBlockChainUrl}/transfer`, {
      userId: from_address,
      merchant,
      toAddress: to_address,
      tokenAddress: transToTokenAddress(token),
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
