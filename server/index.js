const express = require("express")
const bcrypt = require("bcrypt")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()

require("dotenv").config();

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("db connection successfull")
}).catch((error)=>{
    console.log(error)
})



app.listen(process.env.PORT,()=>{
    console.log(`connected to port ${process.env.PORT}`);
})