const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// @route GET api/user
// @desc Get all user
// @access Private
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json({ success: true, users })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route POST api/user
// @desc create one user
// @access Public
router.post('/', async (req, res) => {
  const { username, password, recovery_mail, active_day } = req.body

  // Simple validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing username and/or password' })
  }

  try {
    // Check for existing user
    const user = await User.findOne({ username })

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: 'Username already taken' })
    }

    // All good
    const hashedPassword = await argon2.hash(password)
    const newUser = new User({
      username,
      password: hashedPassword,
      recovery_mail,
      active_day
    })
    await newUser.save()

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    )

    res.json({
      success: true,
      message: 'User created successfully',
      newUser,
      accessToken
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route PUT api/user/:id
// @desc Update one user
// @access Private
router.put('/:id', async (req, res) => {
  const { username, password, recovery_mail, active_day } = req.body
  let hashedPassword = null
  if (password) hashedPassword = await argon2.hash(password)

  // Simple validation
  const UpdateCondition = { _id: req.params.id }
  const originOne = await User.findOne(UpdateCondition)

  if (username !== originOne.username) {
    const precheck = await User.findOne({ username })
    if (precheck) {
      return res.status(401).json({
        success: false,
        message:
          'New user name has been taken already. Please choose another one.'
      })
    }
  }

  try {
    let UpdatedUser = {
      username: username || originOne.username,
      password: password ? hashedPassword : originOne.password,
      recovery_mail: recovery_mail || originOne.recovery_mail,
      active_day: active_day || originOne.active_day
    }

    UpdatedUser = await User.findOneAndUpdate(UpdateCondition, UpdatedUser, {
      new: true
    })

    // User not authorised to update post or post not found
    if (!UpdatedUser) {
      return res.status(401).json({
        success: false,
        message: 'User not found or user not authorised'
      })
    }

    res.json({
      success: true,
      message: 'Excellent progress!',
      UpdatedUser
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route DELETE api/user/:id
// @desc Delete one user
// @access Private
router.delete('/:id', async (req, res) => {
  try {
    const DeleteCondition = { _id: req.params.id }
    const DeletedUser = await User.findOneAndDelete(DeleteCondition)

    // User not authorised or post not found
    if (!DeletedUser) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      })
    } else {
      return res.json({ success: true, DeletedUser })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
