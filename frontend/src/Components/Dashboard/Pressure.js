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
class Pressure extends CustomChart {
    getData = () => chartConfig('pressure', this.props.pressure);
}

export default connect(getTelemetry('pressure'))(Pressure);
