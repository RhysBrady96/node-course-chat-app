// Note: Path is a built in module, dont even need to run npm install
const path = require("path");
// Makes it easy to setup a http server
const express = require("express");
// makes it easy to setup a server/ client communication via websockets
const socketIO = require("socket.io");
const http = require("http");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

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
var chatMembers = new Users();

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

    socket.on("join", (params, callback) => {
        
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback("Name and room name required");
        }
        // Creates groups which you can identify
        socket.join(params.room);
        // after joining one chat it removes the user from other rooms
        chatMembers.removeUser(socket.io);
        // socket.id is just a unique identifier for each socket on the open port
        chatMembers.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUserList", chatMembers.getUserList(params.room));

        socket.emit("newMessage", 
            generateMessage("Admin", "Welcome to the chat app"));

        socket.broadcast.to(params.room).emit("newMessage", 
            generateMessage("Admin", `${params.name} has joined the chat`));
        
        // socket.leave(params.room) <--- also a function
        // io.emit -> io.to(params.room).emit <---- sends a message to everyone in a certain group
        // socket.broadcast.emit -> socket.broadcast.to(params.room).emit <---- sends to everyone EXCEPT the one that is broadcasting

        callback();
    })

    // callback is used for acknowledgements, as it sends an event back to the client
    socket.on("createMessage", (newMessage, callback) => {
        console.log("created Messsage : " , newMessage);
        // io.emit sends a message to EVERY CONNECTION!
        io.emit("newMessage", generateMessage(newMessage.from, newMessage.text));

        callback();

        // // Broadcasting: Emitting an event to everyone but 1 specific user, for below, it sends
        // // to everyone but yourself
        // socket.broadcast.emit("newMessage",
        //     generateMessage(newMessage.from, newMessage.text));
    });

    socket.on("createLocationMessage", (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    })

    socket.on("disconnect", () => {
        var user = chatMembers.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit("updateUserList", chatMembers.getUserList(user.room));
            io.to(user.room).emit("newMesssage", generateMessage("Admin", `${user.name} has left`));
        }
    });

    

});


// app.get("/", (req, res) => {

// });

// We are now using server.listen (HTTP) rahter than app.listen (Express)
server.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});