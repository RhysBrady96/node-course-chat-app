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
        var li = jQuery("<li></li>");
        li.text(`${data.from}: ${data.text}`);

        jQuery("#messages").append(li);
    });

    // // Parameters: 1. eventName
    // // 2. data to send
    // // 3. Callback resulting from an acknowlegment from the server
    // socket.emit("createMessage", {
    //     from : "frank",
    //     text: "Hi"
    // }, function (res) {
    //     console.log("Acknowledged", res);
        
    // });

    // NOTE: The "e" argument is an event, NOT AN ERROR
    jQuery("#message-form").on(("submit"), function(e) {
        e.preventDefault();
        socket.emit("createMessage", {
            from: "User",
            text: jQuery("[name=message]").val()
        }, function () {

        });
    })