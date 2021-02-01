const express = require('express')
const app = express()
const connectDB = require('./lib/mongoose')
const logger = require('./lib/logger')
const router = require('./config/router')
require('dotenv').config()
const PORT = process.env.PORT || 8000

// * Connect the database
connectDB()

// * Log requests being made to the app
app.use(logger)

// * Routes
app.use('/api', router)


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}, LETS GOOO!!`)
})