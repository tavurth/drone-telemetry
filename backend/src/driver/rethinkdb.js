const r = require('rethinkdb');
const { emit } = require('./socket.io');
const { set, run } = require('./connection');

async function getConnection() {
    set(
        await r.connect({
            user: 'admin',
            db: 'telemetry',
            host: 'rethinkdb',
            password: process.env.PASSWORD,
        })
    );
}

const emitEveryTableChange = type => (err, change) => {
    if (err) {
        return console.error(err);
    }

    const { new_val } = change;
    if (!new_val) {
        return;
    }

    emit(type, new_val);
};

async function setupListener(table, options = {}) {
    return (await run(
        r
            .db('telemetry')
            .table(table)
            .changes(options)
    )).each(emitEveryTableChange(table));
}

function setupListeners() {
    setupListener('data');
    setupListener('config');
}

async function rethinkSetup() {
    await getConnection();
    await setupListeners();
}

module.exports = {
    rethinkSetup,
};
