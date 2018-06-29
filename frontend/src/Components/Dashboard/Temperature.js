import React from 'react';
import { connect } from 'react-redux';

import { getTelemetry } from 'store/selectors';
import CustomChart, { chartConfig } from 'components/Chart';

import styles from './styles.scss';

/**
 * Render a chart of temperature.
 *
 * @param {array} temperature - Array of temperature points.
 * @returns {object} Renderable reactDOM object.
 */
function Temperature({ temperature }) {
    const axis = {
        left: {
            legend: 'temperature',
        },
    };

    return <CustomChart data={chartConfig('temperature', temperature)} axis={axis} className={styles.temperature} />;
}

export default connect(getTelemetry('temperature'))(Temperature);
