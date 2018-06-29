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
class SamplingPeriod extends CustomChart {
    getData = () => chartConfig('Sampling Period', this.props.samplingPeriod);
}

export default connect(getTelemetry('sampling_period', 'samplingPeriod'))(SamplingPeriod);
