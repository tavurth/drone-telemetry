import React from 'react';

import Bar from './Bar';
import Line from './Line';
import Scatter from './Scatter';

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

export default class CustomChart extends React.Component {
    getData() {
        const { data } = this.props;

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

    getChartType() {
        const { type = 'scatter' } = this.props;

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

    getOptions() {
        return {};
    }

    getChartProps() {
        const data = this.getData();
        const options = this.getOptions();

        return { options, data };
    }

    render() {
        const ChartType = this.getChartType();
        return <ChartType {...this.getChartProps()} />;
    }
}
