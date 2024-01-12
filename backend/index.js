const express = require('express');
const connectDB = require('./database/db');
const app = express();
require('dotenv').config();
const authRoute=require('./routes/authRoute')
const passport = require('passport');

app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth',authRoute)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal server error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

port=5000;

const server = async() => {
    await connectDB(process.env.MONGO_URL)
    app.listen(port,(req,res)=>{
        console.log("successfully connected")
    })
}

server()