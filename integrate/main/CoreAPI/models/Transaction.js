const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  from_address: {
    type: String,
    required: true,
  },
  to_address: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
