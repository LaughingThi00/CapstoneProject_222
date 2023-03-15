const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Teacher = require("../models/Teacher");
const User = require("../models/User");

// @route GET api/teacher
// @desc Get all teacher
// @access Private
router.get("/",  async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json({ success: true, teachers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/teacher
// @desc Create one teacher
// @access Private
router.post("/",  async (req, res) => {
  const { id, name, userId, gender, birth, phone, email, description } =
    req.body;

  // Simple validation
  if (!id || !userId)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or id of teacher." });

  let precheck = await Teacher.findOne({ id });
  if (precheck)
    return res
      .status(400)
      .json({ success: false, message: "ID has been taken." });

  try {
    const newTeacher = new Teacher({
      id,
      userId,
      name,
      gender,
      birth,
      phone,
      email,
      description,
    });

    await newTeacher.save();

    res.json({
      success: true,
      message: "One teacher has just been added!",
      teacher: newTeacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/teacher/:id
// @desc Update one teacher
// @access Private
router.put("/:id",  async (req, res) => {
  const { id, name, userId, gender, birth, phone, email, description } =
    req.body;

  // Simple validation
  const originOne = await Teacher.findOne({ id: req.params.id });

  try {
    let UpdatedTeacher = {
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

    UpdatedTeacher = await Teacher.findOneAndUpdate(
      UpdateCondition,
      UpdatedTeacher,
      { new: true }
    );

    // User not authorised to update post or post not found
    if (!UpdatedTeacher)
      return res.status(401).json({
        success: false,
        message: "Teacher not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      UpdatedTeacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/teacher/:id
// @desc Delete one teacher
// @access Private
router.delete("/:id",  async (req, res) => {
  try {
    const DeleteCondition = { id: req.params.id };
    const DeletedTeacher = await Teacher.findOneAndDelete(DeleteCondition);

    // User not authorised or post not found
    if (!DeletedTeacher)
      return res.status(401).json({
        success: false,
        message: "Teacher not found",
      });

    await User.findOneAndDelete({ _id: DeletedTeacher.userId });
    res.json({ success: true, DeletedTeacher });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
