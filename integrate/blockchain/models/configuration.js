const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListenDepositSchema = new Schema({
	chainId: Number, 
    value: Number,
    key: 'lastBlockFetchDeposit',
    created_time: Date,
    updated_time: Date,
    updated_by: String
})

module.exports = mongoose.model('ListenDeposit', ListenDepositSchema)