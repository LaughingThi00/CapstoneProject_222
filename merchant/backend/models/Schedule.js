const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  date: {
    type: String
  },
  starttime: {
    type: String
  },
  endtime: {
    type: String
  },
  class_: {
    type: String
  },
  room: {
    type: String
  },
  description: {
    type: String
  }
})

module.exports = mongoose.model('Schedule', ScheduleSchema)
