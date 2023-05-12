const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BuyCryptoSchema = new Schema({
    userId: String,
    merchant: String,
    amount_VND: String,
    for_token: String,
    slippage: Number,
    chainId: Number,
    blockNumber: Number,
    timeStamp: Number,
    transactionHash: String,
    from: String,
    RouterAddress: String,
    amountIn: Number,
    amountOut: Number,
    tokenIn: String,
    tokenOut: String,
    cumulativeGasUsed: Number,
    effectiveGasPrice: Number,
    gasUsed: Number,
    created_time: Date,
    updated_time: Date,
    updated_by: String

})

module.exports = mongoose.model('BuyCrypto', BuyCryptoSchema)
