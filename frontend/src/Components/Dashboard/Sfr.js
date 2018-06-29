import React from 'react';
import { connect } from 'react-redux';

import CustomChart, { chartConfig } from 'components/Chart';
import { getTelemetry } from 'store/selectors';

import styles from './styles.scss';

/**
 * Render a chart of sfr.
 *
 * @param {array} sfr - Array of sfr points.
 * @returns {object} Renderable reactDOM object.
 */
class Sfr extends CustomChart {
    getData = () => chartConfig('sfr', this.props.sfr);
}

export default connect(getTelemetry('sfr'))(Sfr);
