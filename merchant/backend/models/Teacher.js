const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeacherSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  name: {
    type: String
  },
  gender: {
    type: String
  },
  birth: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  description: {
    type: String
  }
})

module.exports = mongoose.model('Teacher', TeacherSchema)
