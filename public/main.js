var protocol = window.location.protocol; // Detecta si es http o https
var host = window.location.host; // Obtiene el host actual

// Conecta usando el protocolo apropiado
var socket = io.connect(`${protocol}//${host}`, { forceNew: true });

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