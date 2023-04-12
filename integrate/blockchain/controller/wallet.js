const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const Wallet = require("../models/wallet");
const {createWallet} = require("../service/wallet")


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
router.post("/create-wallet",  async (req, res) => {
    try {
        const { userId } = req.body;
        const users = await Wallet.find({userId: userId});
        // console.log("user", users);

        if (users.length ==0){
            const data = await createWallet(userId);
            res.json({ success: true, data });
        }
        else{
            const data = {
                addressBitcoin: users[0].key.bitcoin.address,
                addressEther: users[0].key.evm.address,
            }
            res.json({success: false, data, message: "user has been created wallet!"})
        }
        
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

module.exports = router;