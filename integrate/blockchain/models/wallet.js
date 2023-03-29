const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WalletSchema = new Schema({
  userId: String,
  key: {
    evm: {
      networkId: Number,
      networkName: String,
      address: String,
      publicKey: String,
      privateKey: String,
      mnemonic: String
    },
    bitcoin: {
      networkId: Number,
      networkName: String,
      address: String,
      publicKey: String,
      privateKey: String,
      mnemonic: String
    }
  }

})

module.exports = mongoose.model('Wallet', WalletSchema)
