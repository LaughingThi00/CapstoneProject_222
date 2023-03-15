const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Class = require("../models/Class");
const User = require("../models/User");

// @route GET api/class
// @desc Get all class
// @access Private
router.get("/",  async (req, res) => {
  try {
    const classes = await Class.find();
    res.json({ success: true, classes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/class
// @desc Create one class
// @access Private
router.post("/",  async (req, res) => {
  const { id, name, teacher, inspector,  description } = req.body;

  // Simple validation
  if (!id || !name)
    return res
      .status(400)
      .json({ success: false, message: "Missing name or id of class." });

  let precheck = await Class.findOne({ id });
  if (precheck)
    return res
      .status(400)
      .json({ success: false, message: "ID has been taken." });

  try {
    const newClass = new Class({
      id,
      name,
      teacher,
      inspector,
      
      description,
    });

    await newClass.save();

    res.json({
      success: true,
      message: "One class has just been added!",
      class: newClass,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/class/:id
// @desc Update one class
// @access Private
router.put("/update/:id",  async (req, res) => {
  const { name, teacher, inspector,  description } = req.body;

  // Simple validation
  const originOne = await Class.findOne({ id: req.params.id });

  try {
    let UpdatedClass = {
      id: originOne.id,
      name: name ? name : originOne.name,
      teacher: teacher ? teacher : originOne.teacher,
      inspector: inspector ? inspector : originOne.inspector,
      description: description ? description : originOne.description,
    };

    UpdatedClass = await Class.findOneAndUpdate(
      { id: req.params.id },
      UpdatedClass,
      { new: true }
    );

    // User not authorised to update post or post not found
    if (!UpdatedClass)
      return res.status(401).json({
        success: false,
        message: "Class not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      UpdatedClass,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/class/:id
// @desc Increase +1 to num of this class
// @access Private
// router.put("/increase/:id",  async (req, res) => {
//   try {
//     UpdatedClass = await Class.updateOne(
//       { id: req.params.id },
//       { $inc: { num: 1 } }
//     );

//     // User not authorised to update or class not found
//     if (!UpdatedClass)
//       return res.status(401).json({
//         success: false,
//         message: "Class not found or user not authorised",
//       });

//     res.json({
//       success: true,
//       message: "Excellent progress!",
//       UpdatedClass,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// @route PUT api/class/:id
// @desc Increase +1 to num of this class
// @access Private
// router.put("/decrease/:id",  async (req, res) => {
//   try {
//     UpdatedClass = await Class.updateOne(
//       { id: req.params.id },
//       { $inc: { num: -1 } }
//     );

//     // User not authorised to update or class not found
//     if (!UpdatedClass)
//       return res.status(401).json({
//         success: false,
//         message: "Class not found or user not authorised",
//       });

//     res.json({
//       success: true,
//       message: "Excellent progress!",
//       UpdatedClass,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// @route DELETE api/class/:id
// @desc Delete one class
// @access Private
router.delete("/:id",  async (req, res) => {
  try {
    const DeleteCondition = { id: req.params.id };
    const DeletedClass = await Class.findOneAndDelete(DeleteCondition);

    // User not authorised or post not found
    if (!DeletedClass)
      return res.status(401).json({
        success: false,
        message: "Class not found",
      });

    await User.findOneAndDelete({ _id: DeletedClass.userId });
    res.json({ success: true, DeletedClass });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
