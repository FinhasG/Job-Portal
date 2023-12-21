const express = require('express');
const connectDB = require('./database/db');
const app = express();
require('dotenv').config();
const authRoute=require('./routes/authRoute')

app.use(express.json());

app.use('/api/auth',authRoute)

port=5000;

const server = async() => {
    await connectDB(process.env.MONGO_URL)
    app.listen(port,(req,res)=>{
        console.log("successfully connected")
    })
}

server()