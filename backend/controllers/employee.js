require('../config/database')
const employee = require('../models/employee')
const counter = require('../models/counter')
const multer = require('multer')

var store = multer.diskStorage({
	destination:function(req, file, cb) {
		cb(null, './public')
	},
	filename:function(req,file,cb) {
		cb(null, Date.now()+'_'+file.originalname)
	}
})
var upload = multer({storage:store}).single('file')

exports.listEmployees = (req, res) => {
	employee.find()
	.then(list => {
		res.status(200).send(list)
	}).catch(err => {
		res.status(500).send(err)
	})
}

exports.getEmployee = (req, res) => {
	const empID = req.query.empID
	employee.find({employeeID: empID})
	.then(element => {
		res.status(200).send(element)
	}).catch(err => {
		res.status(500).send(err)
	})
}

exports.addEmployees = (req, res) => {
	counter.findOneAndUpdate({_id:"employee_id"}, {$inc: {sequenceValue:1}}, {new: true, useFindAndModify: false})
	.then(counterData => {
		const newEmployee = new employee({
			employeeID: counterData.sequenceValue,
			name: req.body.name,
			salary: req.body.salary,
			dob: req.body.dob,
			skills: req.body.skills,
			image: req.body.image
		})
		newEmployee.save()
		.then(data => {
			res.status(200).send(data)
		}).catch(err => {
			res.status(500).send(err)
		})
	}).catch(err => {
		res.status(500).json({myerr: err})
	})
}

exports.deleteEmployees = (req, res) => {
	const empID = req.query.empID
	employee.remove({employeeID: empID})
	.then(data => {
		res.status(200).send(data)
	}).catch(err => {
		res.status(500).send(err)
	})

}

exports.editEmployees = (req, res) => {
	const empID = req.query.empID
	const name = req.body.name
	const salary = req.body.salary
	const dob = req.body.dob
	const skills = req.body.skills
	const image = req.body.image
	employee.findOneAndUpdate({employeeID: empID}, {$set: {name: name, salary: salary, dob:dob, skills: skills, image: image}}, {new: true, useFindAndModify: false})
	.then(data => {
		res.status(200).send(data)
	}).catch(err => {
		res.status(500).send(err)
	})
}

exports.uploadfn = (req, res) => {
	upload(req, res, function(err){
		if(err) {
			res.status(501).json({error: err})
		}
		res.json({originalname:req.file.originalname, uploadname:req.file.filename})
	})
}