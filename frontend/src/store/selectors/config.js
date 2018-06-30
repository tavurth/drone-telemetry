import Immutable from 'immutable';
import ImmutableStateSelector, { changesSelector } from './immutable';

const configSelector = new ImmutableStateSelector('config');

/**
 * Abstract function for getting data from Redux state
 * Usage: connect(getConfig('temperature'))(MyComponent);
 * This should only be used with react-redux connect
 *
 * @param {string} key - Key to lookup in redux.
 * @param {string} saveToKey - Optional, Key to save in props.
 * @returns {function} Function which injects props into MyComponent when redux state changes.
 */
export function getConfig(key, options = {}) {
    options.as = options.as || key;

    // We'll load the selector here to memoize data
    return changesSelector(configSelector.getSelector(key, Immutable.Map), options);
}
