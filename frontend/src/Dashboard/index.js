import React from 'react';

import Bins from './Bins';
import Humidity from './Humidity';
import Temperature from './Temperature';
import SocketWrapper from './SocketWrapper';

import styles from './styles.scss';

/**
 * Main dashboard component.
 */
class Dashboard extends React.Component {
    render() {
        return (
            <div className={styles.dashboard}>
                <SocketWrapper>
                    <Bins />
                </SocketWrapper>
            </div>
        );
    }
}

export default Dashboard;
