const express = require('express')
const app = express()
const connectDB = require('./lib/mongoose')
const logger = require('./lib/logger')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./config/router')
require('dotenv').config()
const PORT = process.env.PORT || 8000

// * Connect the database
connectDB()

//! MIDDLEWARES
// * Body-parser
app.use(bodyParser.json())
// Cookie parser
app.use(cookieParser())
// * Log requests being made to the app
app.use(logger)
// * Cors
app.use(cors())

// * Routes
app.use('/api', router)


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}, LETS GOOO!!`)
})