/**
 * Abstract function for getting data from Redux state
 * Usage: connect(getTelemetry('temperature'))(MyComponent);
 * This should only be used with react-redux connect
 *
 * @param {string} key - Key to lookup in redux.
 * @param {string} saveToKey - Optional, Key to save in props.
 * @returns {function} Function which injects props into MyComponent when redux state changes.
 */
export function getTelemetry(key, saveToKey = key) {
    return ({ telemetry }) => ({ [saveToKey]: telemetry[key] || [] });
}

export default {
    getTelemetry,
};
