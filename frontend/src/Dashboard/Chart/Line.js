import React from 'react';
import { ResponsiveLine } from '@nivo/line';

import { getAxis, getMargins } from './shared.js';

export default function Line({
    data,
    axis,
    options,
    ...props
    // prettier-no-wrap
}) {

    return (
        <ResponsiveLine
            data={data}
            margin={getMargins(props)}
            minY="auto"
            stacked={true}
            axisBottom={{
                tickSize: 5,
                legend: 'Time',
                tickPadding: 5,
                tickRotation: 0,
                orient: 'bottom',
                legendOffset: 36,
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
            dotLabel="y"
            colors="set1"
            dotSize={10}
            animate={true}
            enableArea={true}
            dotBorderWidth={2}
            motionDamping={15}
            motionStiffness={90}
            enableDotLabel={false}
            dotLabelYOffset={-12}
            dotBorderColor="#ffffff"
            dotColor="inherit:darker(0.3)"
            legends={[
                {
                    itemWidth: 80,
                    itemHeight: 20,
                    symbolSize: 12,
                    translateX: 100,
                    direction: 'column',
                    symbolShape: 'circle',
                    anchor: 'bottom-right',
                },
            ]}
        />
    );
}
