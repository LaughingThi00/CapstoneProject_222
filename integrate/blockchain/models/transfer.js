const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
	userId: String,
    merchant: String,
    blockNumber: Number,
    transactionHash: String,
    amount: Number,
    asset: String,
    toAddress: String,
    tokenAddress: String,
    effectiveGasPrice: Number,
    gasUsed: Number,
    created_time: Date,
    updated_time: Date,
    updated_by: String
    
})

module.exports = mongoose.model('Transaction', TransactionSchema)
