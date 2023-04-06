const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const Wallet = require('../models/wallet')
const { createWallet } = require('../service/wallet')

// @route GET api/user
// @desc Get all user
// @access Private
router.get('/health-check', async (req, res) => {
  try {
    res.json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
});     
router.post("/create-wallet",  async (req, res) => {
    try {
        const { userId } = req.body;
        console.log('userId:', userId)
        const users = await Wallet.find({userId: userId});
        if (!users.length ){
            const data = await createWallet(userId);
            console.log('data:', data)
            
            res.json({ success: true, data });
        }
        else{
            res.json({success: true, data: [], message: "user has been created wallet!"})
        }
        
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  module.exports = router;
