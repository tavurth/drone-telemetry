import React from 'react';

import 'utils/SocketWrapper';
import cc from 'utils/classcat';
import Tabs from 'components/Tabs';
import AdminPanel from 'components/Admin';

import Bins from './Bins';
import Humidity from './Humidity';
import Temperature from './Temperature';

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
                component: AdminPanel,
                title: 'Admin panel',
            },
        ];
    }
}

export default Dashboard;
