import get from 'lodash/get';
import Immutable from 'immutable';

import { getState } from 'store/store';
import ImmutableStateSelector, { changesSelector } from './immutable';

const configSelector = new ImmutableStateSelector('config');

export const webConfigSelector = getConfig('web-config', { as: 'webConfig' });
export function getWebConfig() {
    return webConfigSelector(getState());
}

export function getDataBufferSize() {
    return get(getWebConfig(), 'webConfig.cacheSize', 8);
}

export function getMaxBufferSize() {
    return get(getWebConfig(), 'webConfig.initialSize', 500);
}

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
