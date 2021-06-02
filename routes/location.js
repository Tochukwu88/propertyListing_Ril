const express = require('express')

const {createLocation} = require('../controllers/location')
const router = express.Router()
router.post('/create/location',createLocation)
module.exports = router