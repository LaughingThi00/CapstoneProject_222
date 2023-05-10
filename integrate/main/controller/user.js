const express = require("express");
const router = express.Router();
const Url= require("./../constants/constant");
const axios=require("axios");
// const verifyToken = require('../middleware/auth')

const User = require("../models/User");

// @route GET api/user
// @desc Get all user
// @access Private
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/user
// @desc Get all user
// @access Private
// router.get("/by-merchant", async (req, res) => {
//   const { merchant } = req.body;

//   try {
//     const users = await User.findOne({merchant});
//     res.json({ success: true, users });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// @route POST api/user
// @desc create user and his wallet
// @access Public
router.post("/", async (req, res) => {
  const { 
    merchant,
    userId } = req.body;

  // Simple validation
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing id of this user" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ id:userId });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "This user has existed already!" });
    }

    // All good, let's create wallet for this user

    // Call API from Blockchain to create a new wallet for this user
    const assetRes = await axios.post(`${Url.apiBlockChainUrl}/wallet/create-wallet`, 
    {
      userId,
    });
    if (!assetRes.data.success) {
      return res
        .status(400)
        .json({ success: false, message: "Can not create wallet!" });
    } else {
      try {
        const newUser = new User({
          id: userId,
          merchant,
          asset: [
            { token: "BTC", address: assetRes.data.data.addressBitcoin, amount: 0 },
            { token: "ETH", address: assetRes.data.data.addressEther, amount: 0 },
            { token: "USDT", address: assetRes.data.data.addressEther, amount: 0 },
            { token: "BNB", address: assetRes.data.data.addressEther, amount: 0 },

          ],
        });

        await newUser.save();

        res.json({
          success: true,
          message: "One User has just been added!",
          user: newUser,
        });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/user/:id
// @desc Update one user
// @access Private
router.put("/:id", async (req, res) => {
  const { token, type, amount } = req.body;

  // Simple validation
  const UpdateCondition = { id: req.params.id };
  let originOne = await User.findOne(UpdateCondition);


  
  if (originOne) {

    switch (type) {
      
      case "+":
        originOne.asset.forEach((item,index) => {
          if (item.token === token) {
            originOne.asset[index].amount += amount;
          }
        });
        break;

      case "-":
        originOne.asset.forEach((item,index) => {
          if (item.token === token) {
            if (item.amount < amount)
              return res.status(401).json({
                success: false,
                message: "User doesn't have enough token!",
              });
            else  originOne.asset[index].amount -= amount;
          }
        });
        break;

      default:
        break;

    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid user!",
    });
  }

  try {
    UpdatedUser = await User.findOneAndUpdate(UpdateCondition, originOne, {
      new: true,
    });

    // User not authorised to update post or post not found
    if (!UpdatedUser) {
      return res.status(401).json({
        success: false,
        message: "User not found or user not authorised",
      });
    }

    res.json({
      success: true,
      message: "Excellent progress!",
      UpdatedUser,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/user/:id
// @desc Delete one user
// @access Private
router.delete("/:id", async (req, res) => {
  try {
    const DeleteCondition = { id: req.params.id };
    const DeletedUser = await User.findOneAndDelete(DeleteCondition);

    // User not authorised or post not found
    if (!DeletedUser) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    } else {
      return res.json({ success: true, DeletedUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


module.exports = router;
