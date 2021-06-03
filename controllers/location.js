const Location = require('../models/location')

exports.createLocation = (req,res) =>{
    const {location} = req.body
    let newLocation = new Location ({location})
    newLocation.save((err,location)=>{
        if(err){
          return  res.status(400).json({
                error:'unable to create location'
            })
        }
        return res.json(
            location
        )
    })
}
exports.locationById =(req,res,next,id) =>{
    Location.findById(id).exec((err,location) =>{
        if(err){
            return res.status(400).json({
                error:'location not found'
            })
        }
        req.location = location
        next()
    })
} 
exports.singleLocation = (req,res) =>{
    
    return res.json(req.location)
} 
