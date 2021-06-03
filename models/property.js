const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const propertySchema = new mongoose.Schema({
    type:{
        type:String,
        
        required:true,
      
    },
    address:{
        type:String,
        required:true
    },
    description:{
       type:String,
      
   },
   price:{
    type:Number,
    trim:true,
     required:true,
    maxlength:32
},
location:{
    type:ObjectId,
    ref:"Location",
     required:true,
    
},
agent:{
    type:ObjectId,
    ref:"Agent",
     required:true,
    
},

photo: []
   
 
  
},
{timestamps:true}
)


module.exports = mongoose.model('Property', propertySchema)