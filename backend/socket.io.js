const r = require('rethinkdb');
const { run } = require('./connection');

const socketsConnected = new Map();
async function sendInitialPackage(socket) {
    const data = await run(
        r.object(
            r.args(
                r
                    .db('telemetry')
                    .table('data')
                    .group('type')
                    .orderBy('time')
                    .ungroup()
                    .concatMap(i => [i('group'), i('reduction')])
            )
        )
    );

    socket.emit('initial-data', data);
}

function socketMessage(socket, message, callback) {
    console.log(message);
}

async function changeConfig(socket, newConfig, callback) {
    await run(
        r
            .db('telemetry')
            .table('config')
            .insert(newConfig, { conflict: 'update' })
    );
}

const socketFunctions = {
    changeConfig,
    message: socketMessage,
};

function socketConnected(socket) {
    sendInitialPackage(socket);
    socketsConnected.set(socket.id, socket);

    for (let key in socketFunctions) {
        socket.on(key, (data, callback) => socketFunctions[key](socket, data, callback));
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
