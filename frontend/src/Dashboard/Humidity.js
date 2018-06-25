import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.scss';
import { getTelemetry } from './selectors';
import CustomChart, { chartConfig } from './Chart';

/**
 * Render a chart of humidity.
 *
 * @param {array} humidity - Array of humidity points.
 * @returns {object} Renderable reactDOM object.
 */
function Humidity({ humidity }) {
    const axis = {
        left: {
            legend: 'humidity',
        },
    };

    return (
        <div className={styles.humidity} width="100%" height="100%" data-name="Humidity">
            <CustomChart width="100%" height="100%" data={chartConfig('humidity', humidity)} />
        </div>
    );
}

export default connect(getTelemetry('humidity'))(Humidity);
