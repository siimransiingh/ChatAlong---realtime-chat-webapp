const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const userRoutes = require("./routes/userRoutes") 
const messagesRoutes = require("./routes/messagesRoute") 
const socket = require("socket.io")

require("dotenv").config();

app.use(cors());
app.use(express.json())
app.use("/api/auth", userRoutes)
app.use("/api/messages", messagesRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("db connection successfull")
}).catch((error)=>{
    console.log(error)
})



const server = app.listen(process.env.PORT,()=>{
    console.log(`connected to port ${process.env.PORT}`);
})

const io = socket(server,{
    cors : {
        origin:"http://localhost:3000",
        credentials:true,
    }
});

global.onlinbeUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlinbeUsers.set(userId,socket.id)
    })

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlinbeUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve", data.message)
        }
    })
})