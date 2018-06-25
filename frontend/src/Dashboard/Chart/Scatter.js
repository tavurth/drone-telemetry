import React from 'react';
import { ResponsiveScatterPlotCanvas } from '@nivo/scatterplot';

import { getAxis, getMargins } from './shared.js';

/**
 * Make sure that an item for a scatter plot has an id, else just use the index.
 *
 * @param {array<object>} data - Array of data selections.
 */
function ensureId(item, idx) {
    if (item.hasOwnProperty(idx)) return item;
    return { ...item, id: idx };
}

/**
 * Make sure that items in a scatter plot have an id, else just use the index.
 *
 * @param {array<object>} data - Array of data selections.
 */
function ensureIds(charts) {
    return charts.map(({ data, ...chart }) => ({
        ...chart,
        data: data.map(ensureId),
    }));
}

export default function ScatterChart({
    data,
    axis,
    options,
    ...props
    // prettier-no-wrap
}) {
    return (
        <ResponsiveScatterPlotCanvas
            data={ensureIds(data)}
            margin={getMargins(props)}
            colors="d320b"
            symbolSize={4}
            axisBottom={{
                tickSize: 5,
                legend: 'time',
                tickPadding: 5,
                tickRotation: 0,
                legendOffset: 36,
                orient: 'bottom',
                legendPosition: 'center',
                ...getAxis('bottom', axis),
            }}
            axisLeft={{
                tickSize: 5,
                orient: 'left',
                tickPadding: 5,
                tickRotation: 0,
                legendOffset: -40,
                legend: 'no-label',
                legendPosition: 'center',
                ...getAxis('left', axis),
            }}
            animate={true}
            motionDamping={15}
            enableGridX={false}
            enableGridY={false}
            motionStiffness={90}
            legends={[
                {
                    itemWidth: 100,
                    itemHeight: 12,
                    symbolSize: 12,
                    translateX: 130,
                    itemsSpacing: 5,
                    direction: 'column',
                    symbolShape: 'circle',
                    anchor: 'bottom-right',
                },
            ]}
        />
    );
}
