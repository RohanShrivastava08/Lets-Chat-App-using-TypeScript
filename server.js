var express = require("express");
const { listen } = require("socket.io");
var app = express();
var server = require("http").createServer(app);
var io= require ("socket.io")(server);

users= [];
connections=[];
server.listen(3000);
app.use(express.static(__dirname));

app.get("/", function(req, resp) {
    // Route for localhost:3000/
    resp.sendFile(__dirname+ "/index.html");
})

io.sockets.on("connection", function (socket) {
    // When Client connects to Server
    connections.push(socket); // Add Plug details to custom Array
    console.log("Connected: %s Socket Connected", connections.length); // Curr Connections
    socket.on("Disconnect", function(data) {
        //Client Disconnect from Server

        connections.splice(connections.indexOf(socket),1); // Delete Plug Details
        console.log("Disconnected, %s Socket Connected", connections.length); // Current Connection
    });

    socket.on("Send Message", function(data) {
        console.log(data);
        io.sockets.emit("New Message", {msg: data});
    });
});

console.log('Server is Listening')