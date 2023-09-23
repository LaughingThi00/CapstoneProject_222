const express = require('express');
const router = express.Router();
const axios = require('axios');
const { genKey } = require('./../service/RSA');
// const verifyToken = require('../middleware/auth')

const Bill = require('../models/Bill');

// @route GET api/bill
// @desc Get all bill
// @access Private
router.get('/all', async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json({ success: true, bills });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route POST api/bill
// @desc create bill and his wallet
// @access Public
router.post('/', async (req, res) => {
  const { bill, partner } = req.body;

  // Simple validation
  if (!bill || !partner) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing information of this bill' });
  }

  try {
    // Check if bill exists
    const _bill = await Bill.findOne({ id: bill, partner });

    if (_bill) {
      return res
        .status(400)
        .json({ success: false, message: 'This bill has existed already!' });
    }

    // All good, let's create this bill

    const newBill = new Bill({
      id: bill,
      partner,
    });

    await newBill.save();

    res.json({
      success: true,
      message: 'One Bill has just been added!',
      newBill,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route PUT api/bill
// @desc Update one bill
// @access Private
router.put('/', async (req, res) => {});

// @route DELETE api/bill/:id
// @desc Delete one bill
// @access Private
router.delete('/', async (req, res) => {
  try {
    const DeleteCondition = { id: req.body.bill, partner: req.body.partner };
    const DeletedBill = await Bill.findOneAndDelete(DeleteCondition);

    // Bill not authorised or post not found
    if (!DeletedBill) {
      return res.status(401).json({
        success: false,
        message: 'Bill not found',
      });
    } else {
      return res.json({
        success: true,
        message: 'Excellent process!',
        DeletedBill,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
