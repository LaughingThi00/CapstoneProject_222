const express = require("express");
const router = express.Router();
const Wallet = require("../models/wallet");
const BuyCrypto = require("../models/buy_crypto")
const { buyCrypto } = require("../service/buy_crypyo")


// @route GET api/user
// @desc Get all user
// @access Private
router.get("/history",  async (req, res) => {
    try {
        const {transactionHash} = req.body;
        var history = [];
        if(!transactionHash){
            history = await BuyCrypto.find();
        }
        else{
            history = await BuyCrypto.find({transactionHash});
        }
        res.json({ success: true , history});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
router.post("/buy-crypto",  async (req, res) => {
    try {
        const { userId, merchant, amount_VND, for_token, slippage, chainId } = req.body;
        if (!userId ||
            !merchant ||
            !chainId ||
            !amount_VND ||
            !for_token ||
            !slippage
        ){
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Missing information of this transaction",
                });
        }
        // const chainId = 97;
        const users = await Wallet.find({userId: userId});
        if (users.length === 0){
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