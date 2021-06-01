
const Agent = require('../models/agents')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
require('dotenv').config()

exports.register = (req,res) =>{
    const {name,email,password, confirmPassword} = req.body
    console.log(name,email,password,confirmPassword)
    if(password !== confirmPassword){
      return  res.status(400).json({
            error:"password do not match"
        })
    }
   

    let newAgent = new Agent({name,email,password})
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
        const {_id,name,email} = agent
       return res.json({
           token,
            agent: {_id,name,email} 
       })
    })

}