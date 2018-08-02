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

        var formattedTime = moment(data.createdAt).format("h:mm a");
        var li = jQuery("<li></li>");
        li.text(`${data.from} ${formattedTime}: ${data.text}`);

        jQuery("#messages").append(li);
    });


    socket.on("newLocationMessage", function (data) {

        var formattedTime = moment(data.createdAt).format("h:mm a");
        var li = jQuery("<li></li>")
        // target=_blank opens the link in a new tab rather than redirecting the current one
        var a = jQuery("<a target=\"_blank\">My current location</a>")
        li.text(`${data.from} ${formattedTime}: `);
        a.attr("href", data.url);
        li.append(a);
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

        var messageTextbox = jQuery("[name=message]");

        socket.emit("createMessage", {
            from: "User",
            text: messageTextbox.val()
        }, function () {
            messageTextbox.val("");
        });
    });

    // This does actually save a good amount of time, means you dont have to expensively look
    // throught the DOM
    var locationButton = jQuery("#send-location");

    locationButton.on(("click") , function () {
        if(!navigator.geolocation) {
            return alert("Geolocation is not supported on this browser");
        }

        locationButton.attr("disabled", "disabled").text("Sending location...");
        navigator.geolocation.getCurrentPosition(
            function (position) {
                locationButton.removeAttr("disabled").text("Send Location");
                socket.emit("createLocationMessage", {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            function () {
                locationButton.removeAttr("disabled").text("Send Location");
                alert("Unable to fetch location");
            }
        );

    });