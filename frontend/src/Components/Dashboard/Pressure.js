import React from 'react';
import { connect } from 'react-redux';

import CustomChart, { chartConfig } from 'components/Chart';
import { getTelemetry } from 'store/selectors';

import styles from './styles.scss';

/**
 * Render a chart of pressure.
 *
 * @param {array} pressure - Array of pressure points.
 * @returns {object} Renderable reactDOM object.
 */
function Pressure({ pressure }) {
    const axis = {
        left: {
            legend: 'pressure',
        },
    };

    return <CustomChart data={chartConfig('pressure', pressure)} className={styles.pressure} />;
}

export default connect(getTelemetry('pressure'))(Pressure);
