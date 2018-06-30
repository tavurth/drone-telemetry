import Immutable from 'immutable';
import ImmutableStateSelector, { changesSelector } from './immutable';

const telemetrySelector = new ImmutableStateSelector('telemetry');

/**
 * Abstract function for getting data from Redux state
 * Usage: connect(getTelemetry('temperature'))(MyComponent);
 * This should only be used with react-redux connect
 *
 * @param {string} key - Key to lookup in redux.
 * @param {string} saveToKey - Optional, Key to save in props.
 * @returns {function} Function which injects props into MyComponent when redux state changes.
 */
export function getTelemetry(key, options = {}) {
    options.as = options.as || key;

    // We'll load the selector here to memoize data
    return changesSelector(telemetrySelector.getSelector(key, Immutable.List), options);
}

export default {
    getTelemetry,
};
