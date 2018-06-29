import React from 'react';
import { connect } from 'react-redux';

import CustomChart, { chartConfig } from 'components/Chart';
import { getTelemetry } from 'store/selectors';

import styles from './styles.scss';

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

    return <CustomChart data={chartConfig('humidity', humidity)} className={styles.humidity} />;
}

export default connect(getTelemetry('humidity'))(Humidity);
