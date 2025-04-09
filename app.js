const express = require('express')
const socket  = require('socket.io')
const {Chess}= require('chess.js')
const http = require('http')
const path = require('path')

const app = express();

const server = http.createServer(app);
const io = socket(server)

const chess = new Chess();
let players = {}
let currentPlayer = "W"

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    res.render("index",{title:"Chess Game"});
})


io.on("connection",(unique)=>{
    console.log("unique")
    unique.on("Rohan",()=>{
        io.emit("Rohan giving")
        console.log("Rohan")
    })
unique.on("disconnect",()=>{
    console.log("Disconnected")
})
})


server.listen(3000,()=>{
    console.log("listening to 3000 port")
})