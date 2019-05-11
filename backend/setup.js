require('./config/database')
const employee = require('./models/employee')
const counter = require('./models/counter')

const employeelist = [
	{
		employeeID: 101,
		name: 'Ram',
		dob: new Date(1996, 5, 24),
		salary: 24000,
		skills: ['Skill 2','Skill 4']
	},
	{
		employeeID: 102,
		name: 'Hari',
		dob: new Date(1998, 7, 24),
		salary: 29000,
		skills: ['Skill 1','Skill 3','Skill 6']
	},
	{
		employeeID: 103,
		name: 'Sohan',
		dob: new Date(2000, 9, 24),
		salary: 4000,
		skills: ['Skill 3,Skill 4']
	}
]
employeelist.forEach(employees => {
	const newEmployee = new employee({
		employeeID: employees.employeeID,
		name: employees.name,
		dob: employees.dob,
		salary: employees.salary,
		skills: employees.skills
	})
	newEmployee.save()
	.then(data => {
		console.log('Employee Created')
	}).catch(err => {
		console.log(err)
	})
})

const newCounter = new counter({
	_id: 'employee_id',
	sequenceValue: 103
})

newCounter.save()
.then(data => {
	console.log('Counter Table Created')
	process.exit()
}).catch(err => {
	console.log(err)
})