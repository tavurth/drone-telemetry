import React from 'react';
import { connect } from 'react-redux';

import CustomChart from 'components/Chart';
import { getTelemetry } from 'store/selectors';

import styles from './styles.scss';

/**
 * For each value, insert a new object into the sorted bins list
 * Then, return the sorted bins as an array of objects
 *
 * @param {array} bins - Array of Bins data from the server.
 * @returns {array} An array of generated points for a scatter chart.
 */
function chartConfig(values = []) {
    // Calculate the minimum time so that the chart is not too wide
    const [firstItem = {}] = values;
    const minTime = firstItem.time;

    const sortedBins = {};

    // SortedBins = { 'Bin 1' { id, color, data }, 'Bin 2': ... }
    values.forEach((item, idx) => {
        const { time, value, name } = item;

        // Initialize the bin
        // sortedBins['Bin 1'] = { id: 'Bin 1', color: '...', data: [] }
        if (sortedBins.hasOwnProperty(name) === false) {
            sortedBins[name] = { id: name, color: 'hsl(275, 70%, 50%)', data: [] };
        }

        // Create a new value and add it to the bin
        // sortedBins['Bin 1'] = { id: 'Bin 1', color: '...', data: [{ x, y }, ...] }
        sortedBins[name].data.push({ x: time - minTime, y: value, id: idx });
    });

    // [{ id, color, data }, ...]
    // Ensure that all data is of the same length
    return Object.values(sortedBins);
}

/**
 * Render a chart of Bins.
 *
 * @param {array} Bins - Array of Bins points.
 * @returns {object} Renderable reactDOM object.
 */
function Bins({ bin }) {
    const axis = {
        left: {
            legend: 'Bins',
        },
    };

    return <CustomChart type="scatter" data={chartConfig(bin)} axis={axis} className={styles.bins} />;
}

export default connect(getTelemetry('bin'))(Bins);
