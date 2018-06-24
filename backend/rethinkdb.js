const r = require('rethinkdb');
const { emit } = require('./socket.io');
const { set, run } = require('./connection');

async function getConnection() {
    set(
        await r.connect({
            user: 'admin',
            host: 'rethinkdb',
            password: process.env.PASSWORD,
        })
    );
}

function onChange(err, change) {
    if (err) {
        return console.error(err);
    }

    const { new_val } = change;
    if (!new_val) {
        return;
    }

    emit('data', new_val);
}

async function setupListeners() {
    return (await run(
        r
            .db('data')
            .table('drone_test_1')
            .changes({ includeInitial: false })
    )).each(onChange);
}

async function rethinkSetup() {
    await getConnection();
    setupListeners();
}

module.exports = {
    rethinkSetup,
};
