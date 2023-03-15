const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
	id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	type: {
		type: String,
	},
	state: {
		type: String,
	},
	description: {
		type: String,
	},
})

module.exports = mongoose.model('Room', RoomSchema)
