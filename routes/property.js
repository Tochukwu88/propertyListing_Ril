const express = require('express')

var multer  = require('multer')

var upload = multer({ dest: 'uploads/' })

  

const {listProperty,singleProperty,propertyById,showAllProperty,listPropertyByLocation,listPropertyByAgent,searchProperty} = require('../controllers/property')
const {checkToken,authregAgent} = require('../controllers/auth')
const {agentById} = require('../controllers/agent')

const router = express.Router()
router.post('/list/:agentId',checkToken,authregAgent,upload.array('photos',12),listProperty)
router.get('/property/:propertyId',singleProperty)
router.get('/properties',showAllProperty)
router.get('/properties/location/:locationId',listPropertyByLocation)
router.get('/properties/agent/:agentId',listPropertyByAgent)
router.get('/search',searchProperty)


router.param('propertyId',propertyById)
router.param('agentId',agentById)




module.exports = router
