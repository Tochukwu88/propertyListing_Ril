const Property = require('../models/property')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path')
const fs = require('fs')


exports.propertyById =(req,res,next,id) =>{
    Property.findById(id).populate('location','agent').exec((err,property) =>{
        if(err){
            return res.status(400).json({
                error:'property not found'
            })
        }
        req.property = property
        next()
    })
} 
exports.singleProperty = (req,res) =>{
    
    return res.json(req.property)
} 

 
exports.listProperty =  (req, res, next) => {
    console.log(req.files,req.body)
    const match = ["image/png", "image/jpeg"];


    req.files.map((file)=>{
        
        if (match.indexOf(file.mimetype) === -1) {
            return res.status(400).json({
                error:`${file.originalname} could not be uploaded, file type should be jpeg or png`
            })
           }

    })

    
    const { type,address,overview,price,bed,room,bath,area,agent} = req.body
    if(!address || !overview || !price  || !type || !bed || !room ||!bath || !area ||!agent ){
        return res.status(400).json({
            error:"all fields are required"
        })
    }
    let property =  new Property( req.body)
    if(req.files){
        if(req.files.size > 3000000){
            return res.status(400).json({
                error:"Image should be less than 3mb"
            })
        }
       
        req.files.map((file)=>{
          let fileType =  file.mimetype.split('/')[1]
          
          let newFileName = file.filename + "." + fileType
         
            fs.rename(`./uploads/${file.filename}`,`./uploads/${newFileName}`,()=>{
                 console.log('done')
             })
            
            property.photo.push(
               newFileName)
           
        })
      
    }
    property.save((err,result)=>{
        if(err){
        return    res.status(400).json({
                error:err
            })
        }
       
    return    res.json(result)
    })
   
    
  }
  exports.showAllProperty =(req,res) =>{
      Property.find({}).populate('location','_id location').populate('agent','_id fullName phone ').exec((err,data)=>{
          if(err){
         return     res.status(400).json({
                  error:err
              })
          }
        return  res.json(data)
      })
  }
  exports.listPropertyByLocation = (req,res) =>{
    Property.find({location:req.location}).populate('location','_id location').populate('agent','_id fullName phone ').exec((err,data)=>{
        if(err){
        return    res.status(400).json({
                error:err
            })
        }
       return res.json(data)
    })
}
exports.listPropertyByAgent = (req,res) =>{
    Property.find({agent:req.profile}).populate('agent','_id fullName phone ').populate('location','_id location').exec((err,data)=>{
        if(err){
         return   res.status(400).json({
                error:err
            })
        }
      return  res.json(data)
    })
}
  