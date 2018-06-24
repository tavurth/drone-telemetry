import React from 'react';
import { ResponsiveLine } from '@nivo/line';

export default class CustomChart extends React.Component {
    getData() {
        const { data } = this.props;

        if (Array.isArray(data)) {
            return data;
        }

        if (data instanceof Object) {
            return [data];
        }

        return false;
    }

    render() {
        const data = this.getData();
        if (data === false) {
            return null;
        }

        return (
            <ResponsiveLine
                data={data}
                margin={{
                    top: 50,
                    left: 60,
                    right: 110,
                    bottom: 50,
                }}
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
                }}
                axisLeft={{
                    tickSize: 5,
                    orient: 'left',
                    tickPadding: 5,
                    tickRotation: 0,
                    legendOffset: -40,
                    legend: 'Temperature',
                    legendPosition: 'center',
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
}
