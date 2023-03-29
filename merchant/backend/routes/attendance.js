const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Attendance = require('../models/Attendance')
const User = require('../models/User')

// @route GET api/attendance
// @desc Get all attendance
// @access Private
router.get('/', async (req, res) => {
  try {
    const attendances = await Attendance.find()
    res.json({ success: true, attendances })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route POST api/attendance
// @desc Create one attendance
// @access Private
router.post('/', async (req, res) => {
  const {
    id,
    id_schedule,
    debt_schedule,
    id_target,
    type,
    isSelfCheck,
    id_last_editor,
    datetime_update,
    notice,
    prenum
  } = req.body

  // Simple validation
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing id of attendance.' })
  }

  const precheck = await Attendance.findOne({ id })
  if (precheck) {
    return res
      .status(400)
      .json({ success: false, message: 'ID has been taken.' })
  }

  try {
    const newAttendance = new Attendance({
      id,
      id_schedule,
      debt_schedule,
      id_target,
      type,
      isSelfCheck,
      id_last_editor,
      datetime_update,
      notice,
      prenum
    })

    await newAttendance.save()

    res.json({
      success: true,
      message: 'One attendance has just been added!',
      attendance: newAttendance
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route PUT api/attendance/:id
// @desc Update one attendance
// @access Private
router.put('/:id', async (req, res) => {
  const {
    id_schedule,
    debt_schedule,
    id_target,
    type,
    isSelfCheck,
    id_last_editor,
    datetime_update,
    notice,
    prenum
  } = req.body
  // Simple validation
  const originOne = await Attendance.findOne({ id: req.params.id })

  try {
    let UpdatedAttendance = {
      id: originOne.id,
      id_schedule: id_schedule || originOne.id_schedule,
      debt_schedule: debt_schedule || originOne.debt_schedule,
      id_target: id_target || originOne.id_target,
      type: type || originOne.type,
      isSelfCheck,
      id_last_editor: id_last_editor || originOne.id_last_editor,
      datetime_update: datetime_update || originOne.datetime_update,
      notice: notice || originOne.notice,
      prenum: prenum || originOne.prenum
    }

    UpdatedAttendance = await Attendance.findOneAndUpdate(
      { id: req.params.id },
      UpdatedAttendance,
      { new: true }
    )
    // User not authorised to update post or post not found
    if (!UpdatedAttendance) {
      return res.status(401).json({
        success: false,
        message: 'Attendance not found or user not authorised'
      })
    }

    res.json({
      success: true,
      message: 'Excellent progress!',
      UpdatedAttendance
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route DELETE api/attendance/:id
// @desc Delete one attendance
// @access Private
router.delete('/:id', async (req, res) => {
  try {
    const DeleteCondition = { id: req.params.id }
    const DeletedAttendance = await Attendance.findOneAndDelete(
      DeleteCondition
    )

    // User not authorised or post not found
    if (!DeletedAttendance) {
      return res.status(401).json({
        success: false,
        message: 'Attendance not found'
      })
    }

    await User.findOneAndDelete({ _id: DeletedAttendance.userId })
    res.json({ success: true, DeletedAttendance })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
