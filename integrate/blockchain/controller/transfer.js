const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const Wallet = require("../models/wallet");
const { transfer } = require("../service/transfer")


// @route GET api/user
// @desc Get all user
// @access Private
router.get("/health-check",  async (req, res) => {
  try {
    res.json({ success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});     
router.post("/transfer",  async (req, res) => {
    try {
        const { userId, chainId, toAddress, amount, tokenAddress } = req.body;
        const users = await Wallet.find({userId: userId});
        if (users.length==0){
            res.json({success: true, data: [], message: "user is not found"})
        }
        else{{
            const data = await transfer({userId, chainId, toAddress, amount, tokenAddress});
            res.json({success: true, data})
        }}

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

module.exports = router;