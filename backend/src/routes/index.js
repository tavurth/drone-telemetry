const { r, run } = require('driver/connection');

/**
 * Client sent us a message.
 * @param {string} message - String message from the client.
 */
function socketMessage(message) {}

/**
 * Client asked to update the config for the drone.
 * @param {object} newConfig - The new configuration to be inserted.
 */
async function changeConfig(newConfig) {
    await run(
        r
            .db('telemetry')
            .table('config')
            .insert(newConfig, { conflict: 'update' })
    );
}

/**
 * Retrieve the initial set of data from the database.
 *
 * @returns {object} { 'temperature': [], 'humidity': {} }.
 */
function getInitialPackage() {
    return run(
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
}

/**
 * Client asks for the initial data set.
 * @param {function} callback - Call to send data back to client.
 */
async function getInitialData(callback) {
    callback(await getInitialPackage());
}

const routes = {
    changeConfig,
    message: socketMessage,
    'data:initial': getInitialData,
};

module.exports = routes;
