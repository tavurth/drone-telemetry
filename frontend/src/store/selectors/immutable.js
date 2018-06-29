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
    return telemetryData.toJS();
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

        console.log(this.__selectors, key);
        return this.__selectors[key];
    };
}
