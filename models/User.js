const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')

// * User model
const userSchema = new schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    maxlength: 32
  },
  about: {
    type: String,
    maxlength: 300
  },
  role: {
    type: Number,
    default: 0
  },
  history: {
    type: Array,
    default: []
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true})

// * Stop users password showing in the model schema
userSchema
.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password
    return json
  }
})

//* Compare the password entered at login with the password bcrypt password on file
userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}


// * Create a virtual passwordConfirmation submodel
userSchema
.virtual('passwordConfirmation')
.set(function(passwordConfirmation){
  this._passwordConfirmation = passwordConfirmation
})

// Validate the password, check if it has been updated, does the passwordConfirmation match the password
userSchema
.pre('validate', function(next){
  if (this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'Passwords do not match, try again')
  }
  next()
})

// if the above is true then save password using bcrypt
userSchema
.pre('save', function(next){
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  }
  next()
})

userSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('User', userSchema)