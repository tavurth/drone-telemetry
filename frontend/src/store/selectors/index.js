import Immutable from 'immutable';
import ImmutableStateSelector from './immutable';

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
export function getTelemetry(key, saveToKey = key) {
    // We'll load the selector here to memoize data
    const selector = telemetrySelector.getSelector(key, Immutable.List);

    // Here we'll perform a fast selection which should only update when data changes
    return state => ({ [saveToKey]: selector(state) });
}

export default {
    getTelemetry,
};
