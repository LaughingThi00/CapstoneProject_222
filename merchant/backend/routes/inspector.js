const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Inspector = require('../models/Inspector')
const User = require('../models/User')

// @route GET api/inspector
// @desc Get all inspector
// @access Private
router.get('/', async (req, res) => {
  try {
    const inspectors = await Inspector.find()
    res.json({ success: true, inspectors })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route POST api/inspector
// @desc Create one inspector
// @access Private
router.post('/', async (req, res) => {
  const { id, name, userId, gender, birth, phone, email, description } =
    req.body

  // Simple validation
  if (!id || !userId) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Missing username or id of inspector.'
      })
  }

  const precheck = await Inspector.findOne({ id })
  if (precheck) {
    return res
      .status(400)
      .json({ success: false, message: 'ID has been taken.' })
  }

  try {
    const newInspector = new Inspector({
      id,
      userId,
      name,
      gender,
      birth,
      phone,
      email,
      description
    })

    await newInspector.save()

    res.json({
      success: true,
      message: 'One inspector has just been added!',
      inspector: newInspector
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route PUT api/inspector/:id
// @desc Update one inspector
// @access Private
router.put('/:id', async (req, res) => {
  const { id, name, userId, gender, birth, phone, email, description } =
    req.body

  // Simple validation
  const originOne = await Inspector.findOne({ id: req.params.id })

  try {
    let UpdatedInspector = {
      id: originOne.id,
      name: name || originOne.name,
      userId: userId || originOne.userId,
      gender: gender || originOne.gender,
      birth: birth || originOne.birth,
      phone: phone || originOne.phone,
      email: email || originOne.email,
      description: description || originOne.description
    }

    const UpdateCondition = { id: req.params.id }

    UpdatedInspector = await Inspector.findOneAndUpdate(
      UpdateCondition,
      UpdatedInspector,
      { new: true }
    )

    // User not authorised to update post or post not found
    if (!UpdatedInspector) {
      return res.status(401).json({
        success: false,
        message: 'Inspector not found or user not authorised'
      })
    }

    res.json({
      success: true,
      message: 'Excellent progress!',
      UpdatedInspector
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route DELETE api/inspector/:id
// @desc Delete one inspector
// @access Private
router.delete('/:id', async (req, res) => {
  try {
    const DeleteCondition = { id: req.params.id }
    const DeletedInspector = await Inspector.findOneAndDelete(DeleteCondition)

    // User not authorised or post not found
    if (!DeletedInspector) {
      return res.status(401).json({
        success: false,
        message: 'Inspector not found'
      })
    }

    await User.findOneAndDelete({ _id: DeletedInspector.userId })
    res.json({ success: true, DeletedInspector })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
