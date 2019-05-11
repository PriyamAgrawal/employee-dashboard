const mongoose = require('mongoose')

// const mongoDB = 'mongodb://127.0.0.1/mean'
const mongoDB = 'mongodb://127.0.0.1/employeedashboard'
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.connection.on('connected', () => {
	console.log('DB connected ' + mongoDB)
})
mongoose.connection.on('error', () => {
	console.log('Error connecting to DB')
})

require('../models/employee.js')