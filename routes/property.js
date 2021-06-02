const express = require('express')

var multer  = require('multer')

var upload = multer({ dest: 'uploads/' })

  

const {listProperty,singleProperty,propertyById,showAllProperty} = require('../controllers/property')
const router = express.Router()
router.post('/list',upload.array('photos',12),listProperty)
router.get('/property/:propertyId',singleProperty)
router.get('/properties',showAllProperty)

router.param('propertyId',propertyById)



module.exports = router
