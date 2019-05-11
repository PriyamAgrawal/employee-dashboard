const mongoose = require('mongoose')

const counterSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	sequenceValue: {
		type: Number,
		required: true
	}
})

module.exports = mongoose.model('counter', counterSchema)