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
class Temperature extends CustomChart {
    getData = () => chartConfig('temperature', this.props.temperature);
}

export default connect(getTelemetry('temperature'))(Temperature);
