import set from 'lodash/set';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

/**
 * Helper for selecting from state (using reselect).
 *
 * @param {object} state - Current redux state.
 * @param {array} key - Such as ['x', 0, 'y'] to select state.x[0].y.
 * @returns {any} Whatever is found at get(state, key) ideally an Immutable object.
 */
function deepImmutableStateSelector(rootKey, key, defaultValue = Immutable.Map) {
    return state => state[rootKey].getIn(key) || defaultValue();
}

/**
 * Helper for selecting from state (using reselect).
 * Performs a shallow select on state
 *
 * @param {object} state - Current redux state.
 * @param {string} key - String model 'dot.separated' to lookup in state.
 * @returns {any} Whatever is found at get(state, key) ideally an Immutable object.
 */
function immutableStateSelector(rootKey, key, defaultValue = Immutable.Map) {
    return state => state[rootKey].get(key) || defaultValue();
}

/**
 * Returns new telemetry data after processing.
 * Only called when state changes (new telemetry is added)
 *
 * @param {Immutable.Map} telemetryData - The input telemetry.
 * @returns {array<object>}
 */
function telemetryPostProcessing(telemetryData) {
    // Dealing with an immutable object
    if (telemetryData.toJS instanceof Function) {
        return telemetryData.toJS();
    }

    return telemetryData;
}

/**
 * Generate a state changes selector.
 * This returns a slice of state when it changes.
 *
 * @param {function} selector - Reselect selector.
 * @param {string|array<string>} saveToKey - Simple string or complex, will be set into the returned object.
 * @returns {object} Returned object with the {selection} saved @ {saveToKey}
 */
export function changesSelector(selector, options = {}) {
    const saveToKey = options.as;

    // Handle array style saveToKey model
    if (saveToKey instanceof Array) {
        return state => set({}, saveToKey.join('.'), selector(state));
    }

    // Handle lodash style saveToKey model
    if (~saveToKey.indexOf('.')) {
        return state => set({}, saveToKey, selector(state));
    }

    // Here we'll perform a fast selection which should only update when data changes
    return state => ({ [saveToKey]: selector(state) });
}

/**
 * Holds references to our telemetry selectors.
 * Will insert if none exist
 */
export default class ImmutableStateSelector {
    constructor(rootKey) {
        // Where should we initially look in the JS state
        this.rootKey = rootKey;

        // Selectors will be inserted here
        this.__selectors = {};
    }

    __getDefaultSelector = (key, defaultValue) => {
        // We're dealing with a lodash style selector
        if (~key.indexOf('.')) {
            key = key.split('.');
        }

        // We're dealing with a deep state item
        if (key instanceof Array) {
            return createSelector(deepImmutableStateSelector(this.rootKey, key, defaultValue), telemetryPostProcessing);
        }

        // Shallow state selector
        return createSelector(immutableStateSelector(this.rootKey, key, defaultValue), telemetryPostProcessing);
    };

    getSelector = (key, defaultValue) => {
        // We'll setup a new selector here
        if (this.hasOwnProperty(key) === false) {
            this.__selectors[key] = this.__getDefaultSelector(key, defaultValue);
        }

        return this.__selectors[key];
    };
}
