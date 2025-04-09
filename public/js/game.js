
const socket = io();
socket.emit("Rohan")
socket.on("Rohan giving",()=>{
    console.log("Rohan giving received")
})
socket.on()