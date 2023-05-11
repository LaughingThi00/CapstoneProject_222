const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DepositSchema = new Schema({
    userId: String,
    merchant: String,
    chainId: Number,
    userAddress: String,
    blockNumber: Number,
    timeStamp: Number,
    transactionHash: String,
    symbol: String,
    amount: Number,
    fromAddress: String,
    toAddress: String,
    tokenAddress: String,
    methodId: String,
    functionName: String,
    created_time: Date,
    updated_time: Date,
    updated_by: String

})

module.exports = mongoose.model('Deposit', DepositSchema)
