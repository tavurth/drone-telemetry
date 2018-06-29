import React from 'react';

import Tabs from 'components/Tabs';

class AdminPanel extends Tabs {
    getTabsConfig() {
        return [
            {
                title: 'Information',
                component: () => <span>General information to go here</span>,
            },
            {
                title: 'Controls',
                component: () => <span>Maybe drone controls here</span>,
            },
            {
                title: 'Table setup',
                component: () => <span>Table or other setup here</span>,
            },
        ];
    }
}

export default AdminPanel;
