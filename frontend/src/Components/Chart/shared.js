/**
 * Returns the axis of type {key}
 *
 * @param {string} key - The name of the axis.
 * @param {object} axis - Axis object.
 * @returns {object} Props to override chart axis.
 */
export function getAxis(key, axis = {}) {
    return (axis.hasOwnProperty[key] && axis[key]) || {};
}

/**
 * Returns extra margin settings, and defaults
 *
 * @param {object} props.margins - Margins for chart.
 * @returns {object} Props to override chart margins.
 */
export function getMargins({ margins = {} }) {
    return {
        top: 20,
        left: 40,
        right: 120,
        bottom: 40,
        ...margins,
    };
}
