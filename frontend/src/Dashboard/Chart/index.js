import React from 'react';
import Line from './Line';
import Scatter from './Scatter';

export default class CustomChart extends React.Component {
    getData() {
        const { data } = this.props;

        // We expect a configuration object by default
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
