// Detectar si está en un entorno de producción
var host = window.location.host;
var socket = io.connect(`http://${host}`, { forceNew: true });

socket.on("messages", function (data) {
    console.log(data);
});
function render(data) {
    var html = data.map(function (elem, index) {
    return `<div>
    <strong>${elem.author}</strong>:
    <em>${elem.text}</em>
    </div>`;
    }).join(" ");
    document.getElementById("messages").innerHTML = html;
}
   socket.on("messages", function (data) {
    render(data);
});

function addMessage(e) {
    var mensaje = {
    author: document.getElementById("username").value,
    text: document.getElementById("texto").value,
    };
    socket.emit("new-message", mensaje);
    return false;
}