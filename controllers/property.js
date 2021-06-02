const Property = require('../models/property')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path')
const fs = require('fs')


exports.propertyById =(req,res,next,id) =>{
    Property.findById(id).populate('location').exec((err,property) =>{
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
    const match = ["image/png", "image/jpeg"];


    req.files.map((file)=>{
        
        if (match.indexOf(file.mimetype) === -1) {
            return res.status(400).json({
                error:`${file.originalname} could not be uploaded, file type should be jpeg or png`
            })
           }

    })

    
    const { address,description,location,price} = req.body
    if(!address || !description || !price || !location ){
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
            res.status(400).json({
                error:err
            })
        }
       
        res.json(result)
    })
   
    
  }
  exports.showAllProperty =(req,res) =>{
      Property.find({}).exec((err,data)=>{
          if(err){
              res.status(400).json({
                  error:err
              })
          }
          res.json(data)
      })
  }
  