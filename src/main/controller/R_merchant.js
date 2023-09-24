const express = require('express');
const router = express.Router();
const Url = require('../constants/constant');
const axios = require('axios');
const { genKey } = require('../service/RSA');
// const verifyToken = require('../middleware/auth')

const Merchant = require('../models/Merchant');

// @route GET api/merchant
// @desc Get all merchant
// @access Private
router.get('/', async (req, res) => {
  try {
    const merchants = await Merchant.find();
    res.json({ success: true, merchants });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route POST api/merchant
// @desc create merchant and his wallet
// @access Public
router.post('/', async (req, res) => {
  const { partner_code, name } = req.body;

  // Simple validation
  if (!partner_code || !name) {
    return res.status(400).json({
      success: false,
      message: 'Missing information of this merchant',
    });
  }

  try {
    // Check if merchant exists
    const merchant = await Merchant.findOne({ partner_code });

    if (merchant) {
      return res.status(400).json({
        success: false,
        message: 'This merchant has existed already!',
      });
    }

    // All good, let's create this merchant

    const { privateKey, publicKey } = genKey();

    const newMerchant = new Merchant({
      partner_code,
      name,
      privateKey,
      publicKey,
    });

    await newMerchant.save();

    res.json({
      success: true,
      message: 'One Merchant has just been added!',
      newMerchant,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route PUT api/merchant
// @desc Update one merchant
// @access Private
router.put('/', async (req, res) => {
  const { partner_code, name } = req.body;

  // Simple validation
  const UpdateCondition = { partner_code };
  let originOne = await Merchant.findOne(UpdateCondition);

  if (originOne) {
    originOne.partner_code = partner_code || originOne.partner_code;
    originOne.name = name || originOne.name;
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid merchant!',
    });
  }

  try {
    UpdatedMerchant = await Merchant.findOneAndUpdate(
      UpdateCondition,
      originOne,
      {
        new: true,
      },
    );

    // Merchant not authorised to update post or post not found
    if (!UpdatedMerchant) {
      return res.status(401).json({
        success: false,
        message: 'Merchant not found or merchant not authorised',
      });
    }

    res.json({
      success: true,
      message: 'Excellent progress!',
      UpdatedMerchant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route DELETE api/merchant/:id
// @desc Delete one merchant
// @access Private
router.delete('/', async (req, res) => {
  try {
    const DeleteCondition = { partner_code: req.body.partner_code };
    const DeletedMerchant = await Merchant.findOneAndDelete(DeleteCondition);

    // Merchant not authorised or post not found
    if (!DeletedMerchant) {
      return res.status(401).json({
        success: false,
        message: 'Merchant not found',
      });
    } else {
      return res.json({ success: true, DeletedMerchant });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
