import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.scss';
import { getTelemetry } from './selectors';
import CustomChart, { chartConfig } from './Chart';

/**
 * Render a chart of temperature.
 *
 * @param {array} temperature - Array of temperature points.
 * @returns {object} Renderable reactDOM object.
 */
function Temperature({ temperature }) {
    return (
        <div className={styles.temperature} width="100%" height="100%">
            <CustomChart width="100%" height="100%" data={chartConfig(temperature)} />
        </div>
    );
}

export default connect(getTelemetry('temperature'))(Temperature);
