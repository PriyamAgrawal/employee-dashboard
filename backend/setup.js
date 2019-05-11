require('./config/database')
const employee = require('./models/employee')
const counter = require('./models/counter')

const newCounter = new counter({
	_id: 'employee_id',
	sequenceValue: 100
})

newCounter.save()
.then(data => {
	console.log('Counter Table Created')
	process.exit()
}).catch(err => {
	console.log(err)
})

// const newEmployee = new employee({
// 	employeeID: 101,
// 	name: 'Ram',
// 	dob: new Date(),
// 	salary: 114000
// })

// newEmployee.save()
// .then(data => {
// 	console.log('Employee Created')
// }).catch(err => {
// 	console.log(err)
// })

// const newEmployee2 = new employee({
// 	employeeID: 102,
// 	name: 'Hari',
// 	dob: new Date(),
// 	salary: 24000
// })

// newEmployee2.save()
// .then(data => {
// 	console.log('Employee Created')
// 	process.exit()
// }).catch(err => {
// 	console.log(err)
// })