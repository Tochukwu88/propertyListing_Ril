const Property = require('../models/property')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

 
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
            console.log(file.path)
            property.photo.push(file.path)
          
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