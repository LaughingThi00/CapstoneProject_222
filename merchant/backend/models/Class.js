const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassSchema = new Schema({
	id: {
		type: String,
		required: true,
	},
	
	name: {
		type: String,
	},
	teacher: {
		type: String,
	},
	inspector: {
		type: String,
	},
	// num: {
	// 	type: Number,
	// },
})

module.exports = mongoose.model('Class', ClassSchema)
