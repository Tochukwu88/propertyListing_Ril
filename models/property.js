const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const propertySchema = new mongoose.Schema({
    address:{
        type:String,
        trim:true,
        required:true,
      
    },
    description:{
       type:String,
      
   },
   price:{
    type:Number,
    trim:true,
    // required:true,
    maxlength:32
},
location:{
    type:ObjectId,
    ref:"Location",
    // required:true,
    
},

photo: []
   
 
  
},
{timestamps:true}
)


module.exports = mongoose.model('Property', propertySchema)