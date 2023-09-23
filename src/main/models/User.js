const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  merchant: {
    type: String,
    required: true,
  },

  asset: [
    {
      token: { type: String, required: true },
      wallet: [
        {
          network: { type: String, required: true },
          address: { type: String },
        },
      ],
      amount: { type: Number, required: true },
    },
  ]
});

module.exports = mongoose.model("User", UserSchema);
