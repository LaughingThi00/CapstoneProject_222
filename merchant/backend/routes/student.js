const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Student = require('../models/Student')
const User = require('../models/User')

// @route GET api/student
// @desc Get all student
// @access Private
router.get('/', async (req, res) => {
  try {
    const students = await Student.find()
    res.json({ success: true, students })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route POST api/student
// @desc Create one student
// @access Private
router.post('/', async (req, res) => {
  const { id, name, userId, gender, birth, phone, email, description, class_ } =
    req.body

  // Simple validation
  if (!id || !userId) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing username or id of student.' })
  }

  const precheck = await Student.findOne({ id })
  if (precheck) {
    return res
      .status(400)
      .json({ success: false, message: 'ID student has been taken.' })
  }

  try {
    const newStudent = new Student({
      id,
      userId,
      name,
      gender,
      birth,
      phone,
      email,
      description,
      class_
    })

    await newStudent.save()

    res.json({
      success: true,
      message: 'One student has just been added!',
      student: newStudent
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route PUT api/student/:id
// @desc Update one student
// @access Private
router.put('/update/:id', async (req, res) => {
  const { name, userId, gender, birth, phone, email, description, class_ } =
    req.body

  // Simple validation
  const originOne = await Student.findOne({ id: req.params.id })

  try {
    let UpdatedStudent = {
      id: originOne.id,
      name: name || originOne.name,
      userId: userId || originOne.userId,
      gender: gender || originOne.gender,
      birth: birth || originOne.birth,
      phone: phone || originOne.phone,
      email: email || originOne.email,
      description: description || originOne.description,
      class_: class_ || originOne.class_
    }

    const UpdateCondition = { id: req.params.id }

    UpdatedStudent = await Student.findOneAndUpdate(
      UpdateCondition,
      UpdatedStudent,
      { new: true }
    )

    // User not authorised to update post or post not found
    if (!UpdatedStudent) {
      return res.status(401).json({
        success: false,
        message: 'Student not found or user not authorised'
      })
    }

    res.json({
      success: true,
      message: 'Excellent progress!',
      UpdatedStudent
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route PUT api/student/:id
// @desc remove class_ of every student has class_= :id
// @access Private

router.put('/removeclass/:id', async (req, res) => {
  try {
    UpdatedStudent = await Student.updateMany(
      { id: req.params.id },
      { class_: null }
    )

    // User not authorised to update post or post not found
    if (!UpdatedStudent) {
      return res.status(401).json({
        success: false,
        message: 'Not found student!'
      })
    }

    res.json({
      success: true,
      message: 'Excellent updated!',
      UpdatedStudent
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route PUT api/student/:id
// @desc remove class_ of every student has class_= :id
// @access Private
router.put('/removeclass', async (req, res) => {
  const { class_id } = req.body
  try {
    UpdatedStudentList = await Student.updateMany(
      { class_: class_id },
      { class_: null }
    )

    // User not authorised to update post or post not found
    if (!UpdatedStudentList.n) {
      return res.status(401).json({
        success: false,
        message: 'No student updated!'
      })
    }

    res.json({
      success: true,
      message: `Excellent. ${UpdatedStudentList.n} students updated!`,
      UpdatedStudentList
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route DELETE api/student/:id
// @desc Delete one student
// @access Private
router.delete('/:id', async (req, res) => {
  try {
    const DeleteCondition = { id: req.params.id }
    const DeletedStudent = await Student.findOneAndDelete(DeleteCondition)

    // User not authorised or post not found
    if (!DeletedStudent) {
      return res.status(401).json({
        success: false,
        message: 'Student not found'
      })
    }

    await User.findOneAndDelete({ _id: DeletedStudent.userId })
    res.json({ success: true, DeletedStudent })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
