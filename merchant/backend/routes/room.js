const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Room = require("../models/Room");
const User = require("../models/User");

// @route GET api/room
// @desc Get all room
// @access Private
router.get("/",  async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ success: true, rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/room
// @desc Create one room
// @access Private
router.post("/",  async (req, res) => {
  const { id, name, type, state, description } = req.body;
console.log(id, name, type, state, description)
  // Simple validation
  if (!id || !name)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or id of room." });

  let precheck = await Room.findOne({ id });
  if (precheck)
    return res
      .status(400)
      .json({ success: false, message: "ID has been taken." });

  try {
    const newRoom = new Room({
      id,
      name,
      type,
      state,
      description,
    });

    await newRoom.save();

    res.json({
      success: true,
      message: "One room has just been added!",
      room: newRoom,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/room/:id
// @desc Update one room
// @access Private
router.put("/:id",  async (req, res) => {
  const { name, type, state, description } = req.body;

  // Simple validation
  const originOne = await Room.findOne({ id: req.params.id });

  try {
    let UpdatedRoom = {
      id: originOne.id,
      name: name ? name : originOne.name,
      type: type ? type : originOne.type,
      state: state ? state : originOne.state,
      description: description ? description : originOne.description,
    };

    UpdatedRoom = await Room.findOneAndUpdate(
      { id: req.params.id },
      UpdatedRoom,
      { new: true }
    );

    // User not authorised to update post or post not found
    if (!UpdatedRoom)
      return res.status(401).json({
        success: false,
        message: "Room not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      UpdatedRoom,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/room/:id
// @desc Delete one room
// @access Private
router.delete("/:id",  async (req, res) => {
  try {
    const DeleteCondition = { id: req.params.id };
    const DeletedRoom = await Room.findOneAndDelete(DeleteCondition);

    // User not authorised or post not found
    if (!DeletedRoom)
      return res.status(401).json({
        success: false,
        message: "Room not found",
      });

    await User.findOneAndDelete({ _id: DeletedRoom.userId });
    res.json({ success: true, DeletedRoom });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
