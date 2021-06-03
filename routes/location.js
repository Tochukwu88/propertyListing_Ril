const express = require('express')

const {createLocation,locationById} = require('../controllers/location')
const router = express.Router()
router.post('/create/location',createLocation)
router.param('locationId',locationById)
module.exports = router