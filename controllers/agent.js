const Agent = require('../models/agents')


exports.agentById = (req,res,next,id) =>{
    Agent.findById(id).exec((err,agent)=>{
        if(err || !agent){
            return res.status(400).json({
                error:'agent not found'
            })
        }
        req.profile = agent
        next()
    })
}
exports.getAgent = (req,res) =>{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}