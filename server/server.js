// Note: Path is a built in module, dont even need to run npm install
const path = require("path");
// Makes it easy to setup a http server
const express = require("express");
// makes it easy to setup a server/ client communication via websockets
const socketIO = require("socket.io");
const http = require("http");

const clientPath = path.join(__dirname, "/../client");
const port = process.env.PORT || 3000;


// console.log(__dirname + "\\..\\client");

// console.log(clientPath);

var app = express();
// NOTE: The line below makes it so that we are now using a HTTP server, rather than an express server!
// (Needed in order to sucessfully use socket.io)
var server = http.createServer(app);
// Now we have a web socket server
var io = socketIO(server);

// use serves up middleware, and express.static is built in middleware that allows use to serve up
// static files like html, css, and javascript
app.use(express.static(clientPath));


io.on("connection", (socket) => {
    console.log("new user connected");

    // emit takes the name of the event we want the client to handle
    // As well as the data we want to send, in this case we're sending an object
    socket.emit("newMessage", {
        from: "Steve",
        text : "I like chips",
        createdAt : 123
    });

    socket.on("createMessage", (newMessage) => {
        console.log("created Messsage : " , newMessage);
    });

    socket.on("disconnect", (socket) => {
        console.log("The client has disconnected");
    });
    

});



// app.get("/", (req, res) => {

// });

// We are now using server.listen (HTTP) rahter than app.listen (Express)
server.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});