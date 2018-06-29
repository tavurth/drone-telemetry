import React from 'react';

import Tabs from 'components/Tabs';
import websocket from 'utils/SocketWrapper';

import styles from './styles.scss';

class AdminPanel extends Tabs {
    sendConfig = () => {
        websocket.emit('changeConfig', {
            data: 'test-1',
            id: 'drone-configuration',
        });
    };

    getTabsConfig() {
        return [
            {
                title: 'Controls',
                component: () => (
                    <div className={styles.admin__tab}>
                        <span>Maybe drone controls here</span>
                        <a onClick={this.sendConfig} className={styles.button__update}>
                            Update drone settings
                        </a>
                    </div>
                ),
            },
            {
                title: 'Table setup',
                component: () => <span>Table or other setup here</span>,
            },
            {
                title: 'Information',
                component: () => <span>General information to go here</span>,
            },
        ];
    }
}

export default AdminPanel;
