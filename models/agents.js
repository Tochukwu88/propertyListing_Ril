const mongoose = require('mongoose');
const crypto = require('crypto')
const uuidv1 = require('uuidv1')
const agentSchema = new mongoose.Schema({
    fullName:{
        type:String,
        trim:true,
        required:true,
        
    },
    phone:{
        type:Number,
        trim:true

    },
    email:{
       type:String,
       unique:true,
       trim:true,
       required:true,
       
   },
   hashed_password:{
       type:String,
     
       required:true,
      
   },
   about:{
       type:String,
       trim:true
   },
   salt:String,
  
},
{timestamps:true}
)
agentSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = uuidv1
    this.hashed_password = this.encryptPassword(password)

})
.get(function(){
    return this._password
})
agentSchema.methods={
    authenticate:function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password

    },
    encryptPassword:function(password){
        if(!password){
            return "";
        }
        try{
            return  crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');

        }catch (err){
            return "";
        }

     }
}
module.exports = mongoose.model('Agent', agentSchema)