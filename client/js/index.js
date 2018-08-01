// Try to not use ES6 in client side, because some browsers and devices cant run it
    var socket = io();


    socket.on("connect", function ()  {
        console.log("connected to server");

        // socket.emit("createMessage", {
        //     from : "Rhys",
        //     text : "This is the messsage text :)"            
        // })
    });

    socket.on("disconnect", function () {
        console.log("Hey, we've disconnected");
    });

    // When the server emits a "message" event, we handle it here and we expect the server to have
    // also sent some "data"
    socket.on("newMessage", function (data) {
        console.log("New Message: ", data);
    });