const { r, run } = require('driver/connection');

function socketMessage(message, callback) {
    console.info('TODO: received client message:', message);
}

async function changeConfig(newConfig, callback) {
    console.log(newConfig, callback);
    await run(
        r
            .db('telemetry')
            .table('config')
            .insert(newConfig, { conflict: 'update' })
    );
}

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

const routes = {
    changeConfig,
    message: socketMessage,
    initial: sendInitialPackage,
};

module.exports = routes;
