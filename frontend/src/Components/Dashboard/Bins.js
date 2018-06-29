import React from 'react';
import { connect } from 'react-redux';

import CustomChart from 'components/Chart';
import { getTelemetry } from 'store/selectors';

import styles from './styles.scss';

/**
 * Splits data into an object by bin[name].
 *
 * @param {array<object>} data - Array of JSON data from the database.
 * @returns {object<object>} { 'Bin 1': { id: 'Bin 1', data: [] }, ... }
 */
function splitDataIntoBins(data = []) {
    const sortedBins = {};

    // SortedBins = { 'Bin 1' { id, color, data }, 'Bin 2': ... }
    data.forEach((item, idx) => {
        const { time, value, name } = item;

        // Initialize the bin
        // sortedBins['Bin 1'] = { id: 'Bin 1', color: '...', data: [] }
        if (sortedBins.hasOwnProperty(name) === false) {
            sortedBins[name] = { id: name, data: [] };
        }

        // Create a new value and add it to the bin
        // sortedBins['Bin 1'] = { id: 'Bin 1', color: '...', data: [{ x, y }, ...] }
        sortedBins[name].data.push({ x: time, y: value, id: idx });
    });

    return sortedBins;
}

/**
 * Returns a function (currying) which then:
 * Subtracts {minimumTime} from each time in the series.
 *
 * @param {object} binData - { id: 'Bin 1', data: [] }.
 * @returns {object} { id: 'Bin 1', data: [] } where data is mapped minus time
 */
const subtractMinimumTime = minimumTime => ({ data, ...rest } = {}) => ({
    ...rest,
    data: data.map(({ x, ...rest }) => ({
        ...rest,
        x: x - minimumTime,
    })),
});

/**
 * For each value, insert a new object into the sorted bins list
 * Then, return the sorted bins as an array of objects
 *
 * @param {array} bins - Array of Bins data from the server.
 * @returns {array} An array of generated points for a scatter chart.
 */
function chartConfig(data = []) {
    // Calculate the minimum time so that the chart is not too wide
    const [firstItem = {}] = data;
    const minTime = firstItem.time;

    // We'll generate a function for use in the map, which simply returns
    // each bin, with the data filtered to subtract the minimumTime
    const timeSubtractor = subtractMinimumTime(minTime);

    // [{ id, color, data }, ...]
    // Ensure that all data is of the same length
    return Object.values(splitDataIntoBins(data)).map(timeSubtractor);
}

/**
 * Render a chart of Bins.
 *
 * @param {array} Bins - Array of Bins points.
 * @returns {object} Renderable reactDOM object.
 */
class Bins extends CustomChart {
    getData = () => chartConfig(this.props.bins);
}

export default connect(getTelemetry('bin', 'bins'))(Bins);
