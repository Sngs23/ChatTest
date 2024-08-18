var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var messages = []; // Aquí se almacenarán los mensajes

io.on("connection", function (socket) {
    console.log("Un cliente se ha conectado");

    // Envía el historial de mensajes al nuevo cliente
    socket.emit("messages", messages);

    // Escucha nuevos mensajes
    socket.on("new-message", function (data) {
        messages.push(data);
        io.sockets.emit("messages", messages); // Envía el mensaje a todos los clientes conectados
    });
});

app.use(express.static("public"));

server.listen(8080, function () {
    console.log("Servidor corriendo en http://localhost:8080");
});
