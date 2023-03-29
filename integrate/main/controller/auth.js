// const express = require('express')
// const router = express.Router()
// const argon2 = require('argon2')
// const jwt = require('jsonwebtoken')
// const verifyToken = require('../middleware/auth')

// const User = require('../models/User')
// const Admin = require('../models/Admin')
// const Inspector = require('../models/Inspector')
// const Teacher = require('../models/Teacher')
// const Student = require('../models/Student')

// // @route GET api/auth
// // @desc Check if user is logged in
// // @access Public
// router.get('/', verifyToken, async (req, res) => {
//   try {
//     let account = null
//     let actor = null
//     const user = await User.findById(req.userId).select('-password')
//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'User not found' })
//     } else {
//       // find Account

//       const stu = await Student.find({ userId: user._id })
//       if (stu.length) {
//         account = stu[0]
//         actor = 'STUDENT'
//       } else {
//         const tea = await Teacher.find({ userId: user._id })
//         if (tea.length) {
//           account = tea[0]
//           actor = 'TEACHER'
//         } else {
//           const ins = await Inspector.find({ userId: user._id })
//           if (ins.length) {
//             account = ins[0]
//             actor = 'INSPECTOR'
//           } else {
//             const adm = await Admin.find({ userId: user._id })
//             if (adm.length) {
//               account = adm[0]
//               actor = 'ADMIN'
//             }
//           }
//         }
//       }

//       if (!account) {
//         return res
//           .status(400)
//           .json({ success: false, message: 'Can not find out any account with this user.' })
//       }
//     }

//     return res.json({
//       success: true,
//       message: 'Excellent. Here is your authentication payload!',
//       account,
//       actor
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ success: false, message: 'Internal server error' })
//   }
// })

// // @route POST api/auth/login
// // @desc Login user
// // @access Public
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body
//   // Simple validation
//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ success: false, message: 'Missing username and/or password' })
//   }

//   try {
//     // Check for existing user
//     const user = await User.findOne({ username })
//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Incorrect username or password' })
//     }

//     // Username found
//     const passwordValid = await argon2.verify(user.password, password)
//     if (!passwordValid) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Incorrect username or password' })
//     }

//     // All good
//     // Return token
//     const accessToken = jwt.sign(
//       { userId: user._id },
//       process.env.ACCESS_TOKEN_SECRET
//     )

//     res.json({
//       success: true,
//       message: 'User logged in successfully',
//       accessToken
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ success: false, message: 'Internal server error' })
//   }
// })

// module.exports = router
