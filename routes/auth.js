const express = require('express')
const {register,login} = require('../controllers/auth')
const router = express.Router()
const { userValidationRules,
    
    validate,authValidationRules,
    authvalidate} =require('../validators/index')
router.get('/register', userValidationRules() ,validate,register)
router.get('/login',authValidationRules(),authvalidate, login)



module.exports = router