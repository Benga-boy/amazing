const registrationValidation = (req, res, next) => {
  req.check('name', 'Name is required').not().isEmpty()
  req.check('email', 'Email must be between 3 to 32 character')
  .matches(/.+\@.+\..+/)
  .withMessage('Emaill must contain @')
  .isLength({
    min: 4,
    max: 32
  })
  req.check('password', 'Password is required').not().isEmpty()
  req.check('password')
  .isLength({min: 6})
  .withMessage('Password must contain at least 6 characters')
  .matches(/\d/)
  .withMessage('Password must contain a number')
  const errors = req.validationErrors()
  if(errors) {
    const firstError = errors.map(error => error.msg)[0]
    return res.status(400).json({error: firstError})
  }
  next()
}

module.exports = {registrationValidation}