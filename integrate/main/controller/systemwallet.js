const express = require("express");
const router = express.Router();

import { apiBlockChainUrl } from "../constant";

// const verifyToken = require('../middleware/auth')

const SystemWallet = require("../models/SystemWallet");

// @route GET api/systemwallet
// @desc Get all systemwallet
// @access Private
router.get("/", async (req, res) => {
  try {
    const systemwallets = await SystemWallet.find();
    res.json({ success: true, systemwallets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/systemwallet
// @desc create new storing systemwallet
// @access Public
router.post("/", async (req, res) => {
  const { data } = req.body;

  const {
    address,
    token,
    amount,
  } = data;

  // Simple validation
  if (!address||token||amount) {
    return res
      .status(400)
      .json({ success: false, message: "Missing information of this systemwallet" });
  }

  try {
    // Check if systemwallet exists
    const systemwallet = await SystemWallet.findOne({ address });

    if (systemwallet) {
      return res
        .status(400)
        .json({
          success: false,
          message: "This systemwallet has existed already!",
        });
    }

    // All good, let's create this systemwallet

 
    
      try {
        const newSystemWallet = new SystemWallet({
            address,
    token,
    amount,
        });

        await newSystemWallet.save();

        res.json({
          success: true,
          message: "One SystemWallet has just been added!",
          systemwallet: newSystemWallet,
        });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/systemwallet/:address
// @desc Update one systemwallet
// @access Private
router.put("/:address", async (req, res) => {
  const {  address,
    token,
    amount, } = req.body;

  // Simple validation
  const UpdateCondition = { hash: req.params.address };
  let originOne = await SystemWallet.findOne(UpdateCondition);

  if (originOne) {
    originOne.address = address? address : originOne.address;

    originOne.token = token? token:originOne.token;
    originOne.amount = amount? amount:originOne.amount;
    
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid systemwallet!",
    });
  }

  try {
    UpdatedTransaction = await SystemWallet.findOneAndUpdate(
      UpdateCondition,
      originOne,
      {
        new: true,
      }
    );

    // SystemWallet not authorised to update post or post not found
    if (!UpdatedTransaction) {
      return res.status(401).json({
        success: false,
        message: "SystemWallet not found or systemwallet not authorised",
      });
    }

    res.json({
      success: true,
      message: "Excellent progress!",
      UpdatedTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/systemwallet/:address
// @desc Delete one systemwallet
// @access Private
router.delete("/:address", async (req, res) => {
  try {
    const DeleteCondition = { address: req.params.address };
    const DeletedTransaction = await SystemWallet.findOneAndDelete(DeleteCondition);

    // SystemWallet not authorised or post not found
    if (!DeletedTransaction) {
      return res.status(401).json({
        success: false,
        message: "SystemWallet not found",
      });
    } else {
      return res.json({ success: true, DeletedTransaction });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
