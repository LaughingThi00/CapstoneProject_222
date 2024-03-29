const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SystemWalletSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  name:{
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
	required: true,
  },
});

module.exports = mongoose.model("SystemWallet", SystemWalletSchema);




