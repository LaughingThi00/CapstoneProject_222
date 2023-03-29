const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Schedule = require('../models/Schedule')
const User = require('../models/User')

// @route GET api/schedule
// @desc Get all schedule
// @access Private
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find()
    res.json({ success: true, schedules })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route POST api/schedule
// @desc Create one schedule
// @access Private
router.post('/', async (req, res) => {
  const { id, date, starttime, endtime, class_, room, description } = req.body
  // Simple validation
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing username or id of schedule.' })
  }

  const precheck = await Schedule.findOne({ id })
  if (precheck) {
    return res
      .status(400)
      .json({ success: false, message: 'ID has been taken.' })
  }

  try {
    const newSchedule = new Schedule({
      id,
      date,
      starttime,
      endtime,
      class_,
      room,
      description
    })

    await newSchedule.save()

    res.json({
      success: true,
      message: 'One schedule has just been added!',
      schedule: newSchedule
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route PUT api/schedule/:id
// @desc Update one schedule
// @access Private
router.put('/:id', async (req, res) => {
  const { date, starttime, endtime, class_, room, description } = req.body

  // Simple validation
  const originOne = await Schedule.findOne({ id: req.params.id })

  try {
    let UpdatedSchedule = {
      id: originOne.id,
      date: date || originOne.date,
      starttime: starttime || originOne.starttime,
      endtime: endtime || originOne.endtime,
      class_: class_ || originOne.class_,
      room: room || originOne.room,
      description: description || originOne.description
    }

    UpdatedSchedule = await Schedule.findOneAndUpdate(
      { id: req.params.id },
      UpdatedSchedule,
      { new: true }
    )

    // User not authorised to update post or post not found
    if (!UpdatedSchedule) {
      return res.status(401).json({
        success: false,
        message: 'Schedule not found or user not authorised'
      })
    }

    res.json({
      success: true,
      message: 'Excellent progress!',
      UpdatedSchedule
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route DELETE api/schedule/:id
// @desc Delete one schedule
// @access Private
router.delete('/:id', async (req, res) => {
  try {
    const DeleteCondition = { id: req.params.id }
    const DeletedSchedule = await Schedule.findOneAndDelete(DeleteCondition)

    // User not authorised or post not found
    if (!DeletedSchedule) {
      return res.status(401).json({
        success: false,
        message: 'Schedule not found'
      })
    }

    await User.findOneAndDelete({ _id: DeletedSchedule.userId })
    res.json({ success: true, DeletedSchedule })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
