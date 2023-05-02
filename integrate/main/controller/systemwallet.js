const express = require("express");
const router = express.Router();
const SystemWallet = require("../models/SystemWallet");
// const  apiBlockChainUrl =require ("../constants/constant");


// const verifyToken = require('../middleware/auth')


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
  const   {
    address,
    token,
    amount,
    name,
  } = req.body;



  // Simple validation
  if (!address||!token||!amount||!name) {
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
    name
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
router.put("/", async (req, res) => {
  const {  name,
    address,
    token,
    amount
 
} = req.body;
  // Simple validation
  const UpdateCondition = { address: address };
  let originOne = await SystemWallet.findOne(UpdateCondition);

  if (originOne) {
    originOne.address = address??originOne.address;
    originOne.name=name??originOne.name;
    originOne.token = token?? originOne.token;
    originOne.amount = amount?? originOne.amount;
    
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

// @route PUT api/systemwallet/update-balance
// @desc Update balance one systemwallet
// @access Private
router.put("/update-balance", async (req, res) => {
  const {  type,
    address,
    token,
    amount
 
} = req.body;
  // Simple validation
  const UpdateCondition = { address };
  let originOne = await SystemWallet.findOne(UpdateCondition);


  if (!originOne) {
    return res.status(401).json({
      success: false,
      message: "Invalid systemwallet!",
    });
    
  } else {
    if(originOne.token!==token||(type==='-'&&amount>originOne.amount)) res.status(400).json({
      success:false,message:"Invalid token or token in system wallet is not enough to update!"
    })

    if(type==='-') originOne.amount-=amount;
    else originOne.amount+=amount;
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
    const DeleteCondition = { address:req.params.address };
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
