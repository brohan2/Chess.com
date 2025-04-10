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
    if(!players.white){
        players.white = unique.id;
        unique.emit("playerRole","w");
    }
    else if(!players.black){
        players.black = unique.id;
        unique.emit("playerRole","b");
    }
    else{
        unique.emit("spectator")
    }

    unique.on("disconnect",()=>{
        if(unique.id==players.white){
            delete players.white
        }
        else if(unique.id=players.black){
            delete players.black
        }
    })
    unique.on("move",(move)=>{
        try{
            if(chess.turn()=='w' && socket.id!=players.white) return;
            if(chess.turn()=='b' && socket.id != players.black) return;
            const result = chess.move(move);
            if(result){
                currentPlayer = chess.turn()
                unique.emit("move",move )
                unique.emit("boardState",chess.fen())
            }
            else{
                console.log("Invalid move "+move)
                unique.emit("Invalid move", move)
            }
        }catch(err){
            console.log(err)
            unique.emit("Invalid move ", move)
        }
    })
})



server.listen(3000,()=>{
    console.log("listening to 3000 port")
})