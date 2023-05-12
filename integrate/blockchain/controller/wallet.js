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
router.get("/find-user",  async (req, res) => {
  try {
      const {userId, merchant} = req.body;
      if (!userId || !merchant){
          return res
              .status(400)
              .json({
                  success: false,
                  message: "Missing information of this user",
              });
      }
      const users = await Wallet.find({userId: userId, merchant});
      if (!users || users.length === 0) {
          res.json({ success: true, message: "user not found!", data: []});
      }
      else {
          const data = {
              userId: users[0].userId,
              merchant: users[0].merchant,
              addressBitcoin: users[0].key.bitcoin.address,
              addressEther: users[0].key.evm.address,
          }
          res.json({success: true, data});
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});     
router.post("/create-wallet",  async (req, res) => {
    try {
        const { userId, merchant } = req.body;
        if (!userId || !merchant){
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Missing information of this user",
                });
        }
        const users = await Wallet.find({userId: userId, merchant});
        // console.log("user", users);

        if (users.length === 0){
            const data = await createWallet(userId, merchant);
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