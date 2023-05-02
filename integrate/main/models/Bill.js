const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  partner: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Bill", BillSchema);
