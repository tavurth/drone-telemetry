import React from 'react';
import { connect } from 'react-redux';

import CustomChart, { chartConfig } from 'components/Chart';
import { getTelemetry } from 'store/selectors';

import styles from './styles.scss';

/**
 * Render a chart of sfr.
 *
 * @param {array} samplingPeriod - Array of samplingPeriod points.
 * @returns {object} Renderable reactDOM object.
 */
function SamplingPeriod({ samplingPeriod }) {
    const axis = {
        left: {
            legend: 'samplingPeriod',
        },
    };

    return <CustomChart data={chartConfig('Sampling Period', samplingPeriod)} className={styles.samplingPeriod} />;
}

export default connect(getTelemetry('sampling_period', 'samplingPeriod'))(SamplingPeriod);
