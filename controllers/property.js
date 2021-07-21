const Property = require('../models/property')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path')
const fs = require('fs')
const aws = require("aws-sdk");
aws.config.update({
    secretAccessKey: process.env.Secret_Access_Key,
    accessKeyId: process.env.Access_Key_ID,
    region: "us-east-2",
});
const s3 = new aws.S3();

exports.propertyById = (req, res, next, id) => {
    Property.findById(id).populate('location', 'agent').exec((err, property) => {
        if (err) {
            return res.status(400).json({
                error: 'property not found'
            })
        }
        req.property = property
        next()
    })
}
exports.singleProperty = (req, res) => {

    return res.json(req.property)
}

exports.listProperty = async (req, res, next) => {
    const match = ["image/png", "image/jpeg"];
    req.files.map((file) => {

        if (match.indexOf(file.mimetype) === -1) {
            return res.status(400).json({
                error: `${file.originalname} could not be uploaded, file type should be jpeg or png`
            })
        }

    })
    const { type, address, overview, price, bed, room, bath, area, agent, city, state, country } = req.body
    if (!address || !overview || !price || !type || !bed || !room || !bath || !area || !agent || !city || !state || !country) {
        return res.status(400).json({
            error: "all fields are required"
        })
    }
    let property = new Property(req.body)
    let uploadtos3 =async(file) => {
        let params = {
            ACL: 'public-read',
            Bucket: process.env.BUCKET_NAME,
            Body: file.buffer,
            Key: `${Date.now()}${file.originalname}`

        }

         let response = await s3.upload(params).promise()
         return response



    }
    let promises = []
    req.files.map((file) => {
        promises.push(uploadtos3(file))

    })
    try {
        let datas = await Promise.all(promises)


        datas.map(d => {
            property.photo.push(d.Location)
        })
        property.save()
        res.send('saved succesfully')


    } catch (err) {
        res.status(400).json({
            error: err
        })
        console.log(err)
    }

    next()




}



exports.showAllProperty = (req, res) => {
    Property.find({}).populate('agent', '_id fullName phone ').exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.json(data)
    })
}
//   exports.listPropertyByLocation = (req,res) =>{
//     Property.find({location:req.location}).populate('location','_id location').populate('agent','_id fullName phone ').exec((err,data)=>{
//         if(err){
//         return    res.status(400).json({
//                 error:err
//             })
//         }
//        return res.json(data)
//     })
// }
exports.listPropertyByAgent = (req, res) => {
    Property.find({ agent: req.profile }).populate('agent', '_id fullName phone ').populate('location', '_id location').exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.json(data)
    })
}
exports.searchProperty = (req, res) => {
    console.log(req.query)
    const queryLocation = req.query.city
    Property.find({ $text: { $search: queryLocation } }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.json(result)

    })
}



