const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

const cors = require('cors');

const propertyRoutes = require('./routes/property')
const authRoutes = require('./routes/auth')
const  agentRoutes = require('./routes/agent')
require('dotenv').config();
mongoose.connect(process.env.MONGOOSE_DEV_DB,{useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false,useCreateIndex:true})
.then(()=>console.log('db connected'))
.catch((err)=>{
    console.log(err.message)
})
if(process.env.NODE_ENV='dev'){
    app.use(cors({origin:`${process.env.CLIENT_URL}`}))
}

app.use(express.json())
app.use(morgan('dev'))
app.use("/v1",express.static('uploads'))

app.use('/v1',authRoutes)
app.use('/v1',agentRoutes)
app.use('/v1',propertyRoutes)





const port = process.env.PORT||8000;
app.listen(port,()=>{
    console.log(`server has started on port ${port}`)
})