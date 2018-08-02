// Note: Path is a built in module, dont even need to run npm install
const path = require("path");
// Makes it easy to setup a http server
const express = require("express");
// makes it easy to setup a server/ client communication via websockets
const socketIO = require("socket.io");
const http = require("http");

const {generateMessage} = require("./utils/message");

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

    // // emit takes the name of the event we want the client to handle
    // // As well as the data we want to send, in this case we're sending an object
    // // socket.emit sends a message only to a single connection
    // socket.emit("newMessage", {
    //     from: "Steve",
    //     text : "I like chips",
    //     createdAt : 123
    // });

    socket.emit("newMessage", 
        generateMessage("Admin", "Welcome to the chat app"));

    socket.broadcast.emit("newMessage", 
        generateMessage("Admin", "New user joined the chat"));

    // callback is used for acknowledgements, as it sends an event back to the client
    socket.on("createMessage", (newMessage, callback) => {
        console.log("created Messsage : " , newMessage);
        // io.emit sends a message to EVERY CONNECTION!
        io.emit("newMessage", generateMessage(newMessage.from, newMessage.text));

        callback("This is from the server");

        // // Broadcasting: Emitting an event to everyone but 1 specific user, for below, it sends
        // // to everyone but yourself
        // socket.broadcast.emit("newMessage",
        //     generateMessage(newMessage.from, newMessage.text));
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