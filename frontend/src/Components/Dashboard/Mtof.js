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
class Mtof extends CustomChart {
    getData = () => chartConfig('mtof', this.props.mtof);
}

export default connect(getTelemetry('mtof'))(Mtof);
