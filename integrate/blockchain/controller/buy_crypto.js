const express = require("express");
const router = express.Router();
const Wallet = require("../models/wallet");
const { buyCrypto } = require("../service/buy_crypyo")


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
router.post("/buy-crypto",  async (req, res) => {
    try {
        const { userId, merchant, amount_VND, for_token, slippage, chainId } = req.body;
        // const chainId = 97;
        const users = await Wallet.find({userId: userId});
        if (users.length==0){
            res.json({success: true, data: [], message: "user is not found"})
        }
        else{{
            const data = await buyCrypto({userId, merchant, amount_VND, for_token, slippage, chainId});
            res.json({success: true, data})
        }}

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;