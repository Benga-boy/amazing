const mongoose = require('mongoose')
require('dotenv').config()
const db = process.env.DB

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    })
    console.log('Mongoose is connected....!')
  } catch (err) {
    console.log(err.message)

    // Exit the process with failure
    process.exit(1)
  }
}

module.exports = connectDB