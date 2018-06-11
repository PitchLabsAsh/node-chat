require("./config/config");

const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");

const publicPath = path.join(__dirname, "../public");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


const port = process.env.PORT;
app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    // socket.emit("newMessage", {
    //     from: "from message",
    //     body: "message body",
    //     createdAt:123
    // });

    socket.on("createMessage", (data) =>{
        console.log("createMessage", data);
        io.emit("newMessage",{
            from: data.from,
            text: data.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on("disconnect", () =>{
        console.log("User disconnected");
    });
});


server.listen(port, () => {
  console.log(`server started on port ${port}`);
});

module.exports = { app };
