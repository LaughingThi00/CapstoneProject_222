const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  hash: { type: String, required: true, unique: true },
  transaction_type: { type: String, required: true, unique: true },
  timestamp: { type: String, required: true },
  from_merchant: { type: String },
  from_userId: { type: String },
  to_merchant: { type: String },
  to_userId: { type: String },
  token: { type: String, required: true },
  amount: { type: Number, required: true },
  commission: { type: Number, required: true },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
