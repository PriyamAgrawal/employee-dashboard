const express = require('express')
const router = express.Router()

const employeeController = require('../controllers/employee')

router.get('/list', employeeController.listEmployees)
router.get('/get', employeeController.getEmployee)
router.post('/add', employeeController.addEmployees)
router.get('/delete', employeeController.deleteEmployees)
router.post('/edit', employeeController.editEmployees)
router.post('/upload',employeeController.uploadfn)

module.exports = router