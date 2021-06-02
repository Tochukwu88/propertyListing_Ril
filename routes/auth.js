const express = require('express')
const {register,login} = require('../controllers/auth')
const router = express.Router()
const { userValidationRules,
    
    validate,authValidationRules,
    authvalidate} =require('../validators/index')
router.post('/register', userValidationRules() ,validate,register)
router.post('/login',authValidationRules(),authvalidate, login)



module.exports = router