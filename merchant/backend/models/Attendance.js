const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceSchema = new Schema({
	id: {
		type: String,
		required: true,
	},
	id_schedule: {
		type: String,
	},
	debt_schedule: {
		type: String,
	},
	id_target: {
		type: String,
	},
	type: {
		type: String,
	},
    isSelfCheck: {
		type: Boolean,
	},
    id_last_editor: {
		type: String,
	},
    datetime_update: {
		type: String,
	},
    notice: {
		type: String,
	},
    prenum: {
		type: Number,
	},
})

module.exports = mongoose.model('Attendance', AttendanceSchema)
