const express = require('express')

var multer  = require('multer')
const Property = require('../models/property')
var upload = multer({ dest: 'uploads/' })

  

const {listProperty} = require('../controllers/property')
const router = express.Router()
router.post('/list',upload.array('photos',12),listProperty)


module.exports = router
