const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  asset: {
    type: [
      {
        token: { type: String, required: true },
        address: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
