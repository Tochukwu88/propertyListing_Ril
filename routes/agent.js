const express = require('express')
const { agentById, getAgent } = require('../controllers/agent')

const router = express.Router()
router.get('/agent/:agentId', getAgent)
router.param('agentId',agentById)


module.exports = router