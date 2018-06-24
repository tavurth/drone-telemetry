import React from 'react';
import { connect } from 'react-redux';

import CustomChart from './Chart';
import styles from './styles.scss';
import SocketWrapper from './SocketWrapper';

/**
 * Abstract function for getting data from Redux state
 * Usage: connect(getTelemetry('temperature'))(MyComponent);
 * This should only be used with react-redux connect
 *
 * @param {string} key - Key to lookup in redux.
 * @param {string} saveToKey - Optional, Key to save in props.
 * @returns {function} Function which injects props into MyComponent when redux state changes.
 */
function getTelemetry(key, saveToKey = key) {
    return ({ telemetry }) => ({ [saveToKey]: telemetry[key] || [] });
}

/**
 * Return a configuration object for the chart.
 *
 * @param {array} values - Array of values from RethinkDB.
 * @returns {object} Object containing configuration settings for the chart.
 */
function chartConfig(values) {
    return {
        id: 'mainChartData',
        color: 'hsl(50, 70%, 50%)',
        data: values.map(({ time, value }) => ({ x: time, y: value })),
    };
}

/**
 * Render a chart of temperature.
 *
 * @param {array} temperature - Array of temperature points.
 * @returns {object} Renderable reactDOM object.
 */
function Temperature({ temperature }) {
    return (
        <div className={styles.temperature} width="100%" height="100%">
            <CustomChart width="100%" height="100%" data={chartConfig(temperature)} />
        </div>
    );
}
Temperature = connect(getTelemetry('temperature'))(Temperature);

/**
 * Main dashboard component.
 */
class Dashboard extends React.Component {
    render() {
        return (
            <div className={styles.dashboard}>
                <SocketWrapper>
                    <Temperature />
                </SocketWrapper>
            </div>
        );
    }
}

export default Dashboard;
