require('./config/database.js')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// const cors = require('cors')

const app = express()

app.use(bodyParser.json())
// app.use(cors())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use(express.static(path.join(__dirname, 'public')))

const employeeRoute = require('./routes/employee')

app.use('/employee', employeeRoute)

app.get('/', (req, res) => {
	res.send('Hello World')
})

const port = process.env.PORT || 9000

app.listen(port, () => {
	console.log('Server started on port ' + port)
})