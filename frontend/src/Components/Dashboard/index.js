import React from 'react';

import 'utils/SocketWrapper';
import cc from 'utils/classcat';
import Tabs from 'components/Tabs';
import AdminPanel from 'components/Admin';

import Sfr from './Sfr';
import Bins from './Bins';
import Mtof from './Mtof';
import Pressure from './Pressure';
import Temperature from './Temperature';
import SamplingPeriod from './SamplingPeriod';

import styles from './styles.scss';

/**
 * Main dashboard component.
 */
class Dashboard extends Tabs {
    getTabsConfig() {
        return [
            {
                component: Bins,
                title: 'Bin data',
            },
            {
                component: Temperature,
                title: 'Temperature',
            },
            {
                component: Pressure,
                title: 'Pressure',
            },
            {
                component: SamplingPeriod,
                title: 'Sampling Period',
            },
            {
                component: Sfr,
                title: 'Sfr',
            },
            {
                component: Mtof,
                title: 'Mtof',
            },
            {
                component: AdminPanel,
                title: 'Admin panel',
            },
        ];
    }
}

export default Dashboard;
