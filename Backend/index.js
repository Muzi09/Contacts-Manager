const express = require('express')
const app = express()
const router = require('./Routes/Route')   
const conn = require('./Connection/conn') 
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

conn()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/', router)

app.listen(process.env.port, () => {
    console.log("Server is up and running at port " + process.env.port)
})