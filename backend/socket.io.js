const r = require('rethinkdb');
const { run } = require('./connection');

const socketsConnected = new Map();

async function sendInitialPackage(socket) {
    const data = await run(
        r.object(
            r.args(
                r
                    .db('data')
                    .table('drone_test_1')
                    .group('type')
                    .orderBy('time')
                    .ungroup()
                    .concatMap(i => [i('group'), i('reduction')])
            )
        )
    );

    socket.emit('initial-data', data);
}

function socketMessage(socket, ...messages) {
    console.log(messages);
}

const socketFunctions = {
    message: socketMessage,
};

function socketConnected(socket) {
    sendInitialPackage(socket);
    socketsConnected.set(socket.id, socket);

    for (let key in socketFunctions) {
        socket.on(key, (...data) => socketFunctions[key](socket, ...data));
    }
}

function socketDisconnected(socket) {
    sockets.connected.delete(socket.id, socket);

    for (let key in socketFunctions) {
        socket.off(key, socketFunctions[key]);
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
