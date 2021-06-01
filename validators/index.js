const { body, check, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    // check('name'," name is required.")
    // .notEmpty().isString(),
    check('name','name is required').notEmpty().withMessage('name is required'),
    check('email','email is required').notEmpty().isEmail().withMessage('email must contain @'),
    
    check('password','password is required').notEmpty().isLength({ min: 6 })
    .withMessage('password must contain 6 characters')
    .matches(/\d/)
    .withMessage('password must contain a number'),
    check('confirmPassword','confirmPassword is required').notEmpty().isLength({ min: 6 })
    .withMessage('password must contain 6 characters')
    .matches(/\d/)
    .withMessage('password must contain a number'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}
const authValidationRules = () => {
  return [
    
    check('email','email is required').notEmpty().isEmail().withMessage('email must contain @'),
    
    check('password','password is required').notEmpty().isLength({ min: 6 })
    .withMessage('password must contain 6 characters')
    .matches(/\d/)
    .withMessage('password must contain a number'),
  ]
}

const authvalidate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}


module.exports = {
    userValidationRules,
    
    validate,
    authValidationRules,
    authvalidate
    
  }
         