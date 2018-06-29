import React from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';

import { getAxis, getMargins } from './shared.js';

function getKeys(data = {}) {
    const keys = new Set();

    data.data.forEach(dataItem => keys.add(dataItem.name));

    return keys.toArray();
}

function getBarData(data = {}) {
    return data.data.map(dataItem => {
        return 'TODO';
    });
}

export default function BarChart({
    data,
    axis,
    options,
    ...props
    // prettier-no-wrap
}) {
    return (
        <ResponsiveBarCanvas
            data={data}
            keys={getKeys(data)}
            indexBy="bin"
            margin={{
                top: 50,
                right: 60,
                bottom: 50,
                left: 60,
            }}
            pixelRatio={1}
            padding={0.15}
            innerPadding={0}
            minValue="auto"
            maxValue="auto"
            groupMode="stacked"
            layout="horizontal"
            reverse={false}
            colors="d320b"
            colorBy="id"
            borderWidth={0}
            borderColor="inherit:darker(1.6)"
            axisTop={{
                orient: 'top',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
            }}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'center',
                legendOffset: 36,
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'center',
                legendOffset: -40,
            }}
            enableGridX={false}
            enableGridY={true}
            enableLabel={true}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="inherit:darker(1.6)"
            isInteractive={true}
            theme={{
                tooltip: {
                    container: {
                        fontSize: '13px',
                    },
                },
                labels: {
                    textColor: '#555',
                },
            }}
        />
    );
}
