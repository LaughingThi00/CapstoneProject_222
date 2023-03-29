const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
})

module.exports = mongoose.model('Token', TokenSchema)
