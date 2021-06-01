const express = require('express');
const {getRoute} = require('../controllers/getRoute')
const router = express.Router();
router.get('/' ,getRoute)

module.exports = router