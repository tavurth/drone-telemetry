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
    if (newConfig.id) {
        await run(
            r
                .db('telemetry')
                .table('config')
                .get(newConfig.id)
                .replace(newConfig)
        );
    }

    await run(
        r
            .db('telemetry')
            .table('config')
            .insert(newConfig)
    );
}

/**
 * Retrieve the initial set of data from the database.
 *
 * @returns {object} { 'temperature': [], 'humidity': {} }.
 */
function getInitialDataSet() {
    return run(
        r
            .table('data')
            .group('type')
            .orderBy('time')
            .ungroup()
    );
}

/**
 * Returns all initial configs as an object.
 * @returns {object} { configId: config }.
 */
function getInitialConfigSet() {
    return run(
        r
            .table('config')
            .group('id')
            .nth(0)
            .ungroup()
    );
}

/**
 * Client asks for the initial data set.
 * @param {function} callback - Call to send data back to client.
 */
async function getInitialData(callback) {
    callback(await getInitialDataSet());
}

/**
 * Client asks for the initial config.
 * @param {function} callback - Call to send data back to client.
 */
async function getInitialConfig(callback) {
    callback(await getInitialConfigSet());
}

const routes = {
    changeConfig,
    message: socketMessage,
    'data:initial': getInitialData,
    'config:initial': getInitialConfig,
};

module.exports = routes;
