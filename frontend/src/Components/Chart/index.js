import React from 'react';

import cc from 'utils/classcat';

import Bar from './Bar';
import Line from './Line';
import Scatter from './Scatter';

import styles from './styles.scss';

/**
 * Return a configuration object for the chart.
 *
 * @param {array} values - Array of values from RethinkDB.
 * @returns {object} Object containing configuration settings for the chart.
 */
export function chartConfig(id, values = []) {
    const [firstItem = {}] = values;
    const minTime = firstItem.time;

    const data = values.map(({ id, time, value }) => ({ id, x: time - minTime, y: value || 0 }));

    return {
        id,
        data,
        color: 'hsl(50, 70%, 50%)',
    };
}

export default class CustomChart extends React.PureComponent {
    // These functions should be overridden in your extension class
    getData = () => [];
    getOptions = () => ({});
    getClassName = () => '';
    getChartType = () => 'scatter';

    __getData() {
        const data = this.getData();

        // We expect an array of configuration objects by default
        if (Array.isArray(data)) {
            return data.filter(i => data);
        }

        // Else, coerce one
        if (data instanceof Object) {
            return [data].filter(i => i.data.length);
        }

        return { data: [] };
    }

    __getOptions() {
        return this.getOptions();
    }

    __getChartType() {
        const type = this.getChartType();

        switch (type) {
            case 'line':
                return Line;

            case 'bar':
                return Bar;

            case 'scatter':
            default:
                return Scatter;
        }
    }

    __getChartProps() {
        const data = this.__getData();
        const options = this.__getOptions();

        return { options, data };
    }

    render() {
        const ChartType = this.__getChartType();

        return (
            <div className={cc(styles.chart__main, this.getClassName())} width="100%" height="100%" data-type="Chart">
                <ChartType {...this.__getChartProps()} />
            </div>
        );
    }
}
