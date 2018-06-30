const routes = require('routes');
const { r, run } = require('driver/connection');

const socketsConnected = new Map();

function socketConnected(socket) {
    console.log(routes);
    routes.initial(socket);
    socketsConnected.set(socket.id, socket);

    for (let key in routes) {
        socket.on(key, routes[key]);
    }
}

function socketDisconnected(socket) {
    sockets.connected.delete(socket.id, socket);

    for (let key in routes) {
        socket.off(key, routes[key]);
    }
}

let IO = false;
function getIo() {
    return IO;
}

function emit(...args) {
    return IO.emit(...args);
}

function socketSetup(http) {
    const io = require('socket.io')(http);

    io.on('connection', socketConnected);
    io.on('disconnect', socketDisconnected);

    return (IO = io);
}

module.exports = {
    emit,
    getIo,
    socketSetup,
};
