const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema
const geocoder= require('../controllers/geocoder')

const propertySchema = new mongoose.Schema({
    type:{
        type:String,
        trim:true,
        
        required:true,
      
    },
    address:{
        type:String,
        required:true,
        trim:true,
    },
    overview:{
       type:String,
       trim:true,
      
   },
   price:{
    type:Number,
    trim:true,
     required:true,
    maxlength:32
},
bed:{
  type:Number,
  trim:true
},
bath:{
  type:Number,
  trim:true
  

},
room:{
  type:Number,
  trim:true
},
area:{
  type:Number,
  trim:true
},
location: {
    type: {
      type: String, 
      enum: ['Point'], 
    
    },
    coordinates: {
      type: [Number],
      index:'2dsphere'
    },
    formattedAddress:String,
    city:String,
    country:String

  },
agent:{
    type:ObjectId,
    ref:"Agent",
    required:true,
     trim:true,
    
},


photo: []
   
 
  
},
{timestamps:true}
)
propertySchema.pre('save',async function(next){
     const loc = await geocoder.geocode(this.address)
     this.location= {
         type:'Point',
         coordinates:[loc[0].latitude, loc[0].longitude],
         formattedAddress:loc[0].formattedAddress,
         city:loc[0].city,
         country:loc[0].country
     }
     
     
      
    
    

     
    
    next()

})


module.exports = mongoose.model('Property', propertySchema)