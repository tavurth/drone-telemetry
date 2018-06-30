const routes = require('routes');
const { r, run } = require('driver/connection');

class SocketMap {
    constructor(routes) {
        this.routes = routes;
        this.sockets = new Map();

        this.add = this.add.bind(this);
        this.rem = this.rem.bind(this);
    }

    add(socket) {
        if (this.routes.hasOwnProperty('initial')) {
            this.routes.initial(socket);
        }

        this.sockets.set(socket.id, socket);

        for (let key in routes) {
            socket.on(key, this.routes[key]);
        }
    }

    rem(socket) {
        if (this.routes.hasOwnProperty('final')) {
            this.routes.final(socket);
        }

        this.sockets.delete(socket.id, socket);

        for (let key in routes) {
            socket.off(key, this.routes[key]);
        }
    }
}

const mainSocketMap = new SocketMap(routes);

let IO = false;

function emit(...args) {
    return IO.emit(...args);
}

function socketSetup(http) {
    const io = require('socket.io')(http, {
        transports: ['polling', 'websocket'],
    });

    io.on('connection', mainSocketMap.add);
    io.on('disconnect', mainSocketMap.rem);

    return (IO = io);
}

module.exports = {
    emit,
    socketSetup,
};
