const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
	employeeID: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	dob: {
		type: Date,
		required: true
	},
	salary: {
		type: Number,
		required: true
	},
	skills: {
		type: [String],
		required: true
	},
	image: {
		type: String
	}
})

module.exports = mongoose.model('employee', employeeSchema)