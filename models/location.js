const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    location:{
        type:String,
        trim:true,
        required:true,
      
    }
  
},
{timestamps:true}
)


module.exports = mongoose.model('Location', locationSchema)