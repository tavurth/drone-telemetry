let CONNECTION = false;

function get(connection) {
    return CONNECTION;
}

function set(connection) {
    console.info('Connected to RethinkDB!');
    CONNECTION = connection;
}

function run(query) {
    return query.run(CONNECTION);
}

module.exports = {
    get,
    set,
    run,
};
