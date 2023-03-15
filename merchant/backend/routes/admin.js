const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Admin = require("../models/Admin");
const User = require("../models/User");

// @route GET api/admin
// @desc Get all admin
// @access Private
router.get("/",
//   
 async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json({ success: true, admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/admin
// @desc Create one admin
// @access Private
router.post("/", 
//  
async (req, res) => {
  const { id, name, userId, gender, birth, phone, email, description } =
    req.body;

  // Simple validation
  if (!id || !userId)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or id of admin." });

  let precheck = await Admin.findOne({ id });
  if (precheck)
    return res
      .status(400)
      .json({ success: false, message: "ID has been taken." });

  try {
    const newAdmin = new Admin({
      id,
      userId,
      name,
      gender,
      birth,
      phone,
      email,
      description,
    });

    await newAdmin.save();

    res.json({
      success: true,
      message: "One admin has just been added!",
      admin: newAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/admin/:id
// @desc Update one admin
// @access Private
router.put("/:id",  async (req, res) => {
  const { name, userId, gender, birth, phone, email, description } = req.body

  // Simple validation
  const originOne = await Admin.findOne({ id: req.params.id });

  try {
    let UpdatedAdmin = {
      id: originOne.id,
      name: name ? name : originOne.name,
      userId: userId ? userId : originOne.userId,
      gender: gender ? gender : originOne.gender,
      birth: birth ? birth : originOne.birth,
      phone: phone ? phone : originOne.phone,
      email: email ? email : originOne.email,
      description: description ? description : originOne.description,
    };

    const UpdateCondition = { id: req.params.id };

    UpdatedAdmin = await Admin.findOneAndUpdate(UpdateCondition, UpdatedAdmin, 
      {new: true});

    // User not authorised to update post or post not found
    if (!UpdatedAdmin)
      return res.status(401).json({
        success: false,
        message: "Admin not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      UpdatedAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/admin/:id
// @desc Delete one admin
// @access Private
router.delete("/:id", async (req, res) => {
  try {
    const DeleteCondition = { id: req.params.id };
    const DeletedAdmin = await Admin.findOneAndDelete(DeleteCondition);

    // User not authorised or post not found
    if (!DeletedAdmin)
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });

    const DeletedUser= await User.findOneAndDelete({ _id: DeletedAdmin.userId });
    res.json({ success: true, DeletedAdmin,DeletedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
