import React from 'react';
import { connect } from 'react-redux';

import CustomChart, { chartConfig } from 'components/Chart';
import { getTelemetry } from 'store/selectors';

import styles from './styles.scss';

/**
 * Render a chart of mtof.
 *
 * @param {array} mtof - Array of mtof points.
 * @returns {object} Renderable reactDOM object.
 */
function Mtof({ mtof }) {
    const axis = {
        left: {
            legend: 'mtof',
        },
    };

    return <CustomChart data={chartConfig('mtof', mtof)} className={styles.mtof} />;
}

export default connect(getTelemetry('mtof'))(Mtof);
