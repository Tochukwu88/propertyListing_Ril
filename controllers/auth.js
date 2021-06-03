
const Agent = require('../models/agents')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
require('dotenv').config()

exports.register = (req,res) =>{
    const {fullName,email,password, confirmPassword} = req.body
    
    if(password !== confirmPassword){
      return  res.status(400).json({
            error:"password do not match"
        })
    }
   

    let newAgent = new Agent({fullName,email,password})
    newAgent.save((err,agent)=>{
        if(err){
          return  res.status(400).json({
                error:err
            })
        }
        agent.salt = undefined
        agent.hashed_password = undefined
        return res.json(agent)
    })
   
}
exports.login = (req,res) =>{
    const {email, password} = req.body
    Agent.findOne({email}).exec((err,agent)=>{
        if(err || !agent){
          return  res.status(400).json({
                error:"Agent with this email does not exist"
            })
        }
        if(!agent.authenticate(password)){
         return   res.status(400).json({
                error:"email and password do not match"
            })
        }
        const token =  jwt.sign({_id:agent._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.cookie('token' , token, {expiresIn:'1d'})
        const {_id,name,email} = agent
       return res.json({
           token,
            agent: {_id,name,email} 
       })
    })

}
exports.checkToken = expressJWT({
    secret:process.env.JWT_SECRET,algorithms: ['HS256'],
    userProperty:"auth"
})
exports.authregAgent = (req,res,next) =>{
    let agent = req.profile && req.auth && req.profile._id == req.auth._id
    if(!agent){
        return res.status(403).json({
            error:'please login'
        })
    }
    next()
}