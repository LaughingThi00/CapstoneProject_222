const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const Wallet = require("../models/wallet");
const { transfer } = require("../service/transfer")
const TransferModel = require("../models/transfer");


// @route GET api/user
// @desc Get all user
// @access Private
router.get("/history",  async (req, res) => {
  try {
      const {transactionHash} = req.body;
      var history = [];
      if(!transactionHash){
          history = await TransferModel.find();
      }
      else{
          history = await TransferModel.find({transactionHash});
      }
      res.json({ success: true , history});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});     
router.post("/transfer",  async (req, res) => {
    try {
        const { userId, merchant, chainId, toAddress, amount, asset } = req.body;
        if (!userId ||
            !merchant ||
            !chainId ||
            !toAddress ||
            !amount ||
            !asset
        ){
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Missing information of this transaction",
                });
        }
        const users = await Wallet.find({userId: userId});
        if (users.length==0){
            res.json({success: true, data: [], message: "user is not found"})
        }
        else{{
            const data = await transfer({userId, chainId, merchant, toAddress, amount, asset});
            res.json({success: true, data})
        }}

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

module.exports = router;