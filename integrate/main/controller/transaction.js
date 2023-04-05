const express = require("express");
const router = express.Router();

import { apiBlockChainUrl } from "../constant";

// const verifyToken = require('../middleware/auth')

const Transaction = require("../models/Transaction");

// @route GET api/transaction
// @desc Get all transaction
// @access Private
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json({ success: true, transactions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/transaction
// @desc create new storing transaction
// @access Public
router.post("/", async (req, res) => {
  const { data } = req.body;

  const {
    hash,
    timestamp,
    from_address,
    to_address,
    token,
    amount,
    commission,
  } = data;

  // Simple validation
  if (!hash) {
    return res
      .status(400)
      .json({ success: false, message: "Missing hash of this transaction" });
  }

  try {
    // Check if transaction exists
    const transaction = await Transaction.findOne({ hash });

    if (transaction) {
      return res
        .status(400)
        .json({
          success: false,
          message: "This transaction has existed already!",
        });
    }

    // All good, let's create this transaction

 
    
      try {
        const newTransaction = new Transaction({
            hash,
            timestamp,
            from_address,
            to_address,
            token,
            amount,
            commission
        });

        await newTransaction.save();

        res.json({
          success: true,
          message: "One Transaction has just been added!",
          transaction: newTransaction,
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

// @route PUT api/transaction/:hash
// @desc Update one transaction
// @access Private
router.put("/:hash", async (req, res) => {
  const { hash,
    timestamp,
    from_address,
    to_address,
    token,
    amount,
    commission, } = req.body;

  // Simple validation
  const UpdateCondition = { hash: req.params.hash };
  let originOne = await Transaction.findOne(UpdateCondition);

  if (originOne) {
    originOne.hash = hash? hash : originOne.hash;
    originOne.timestamp = timestamp? timestamp:originOne.timestamp;
    originOne.from_address = from_address? from_address:originOne.from_address;
    originOne.to_address = to_address? to_address:originOne.to_address;
    originOne.token = token? token:originOne.token;
    originOne.amount = amount? amount:originOne.amount;
    originOne.commission=commission?commission:originOne.commission;
    
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid transaction!",
    });
  }

  try {
    UpdatedTransaction = await Transaction.findOneAndUpdate(
      UpdateCondition,
      originOne,
      {
        new: true,
      }
    );

    // Transaction not authorised to update post or post not found
    if (!UpdatedTransaction) {
      return res.status(401).json({
        success: false,
        message: "Transaction not found or transaction not authorised",
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

// @route DELETE api/transaction/:id
// @desc Delete one transaction
// @access Private
router.delete("/:hash", async (req, res) => {
  try {
    const DeleteCondition = { hash: req.params.hash };
    const DeletedTransaction = await Transaction.findOneAndDelete(DeleteCondition);

    // Transaction not authorised or post not found
    if (!DeletedTransaction) {
      return res.status(401).json({
        success: false,
        message: "Transaction not found",
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
