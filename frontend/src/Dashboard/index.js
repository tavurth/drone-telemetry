import React from 'react';

import styles from './styles.scss';
import Temperature from './Temperature';
import SocketWrapper from './SocketWrapper';

/**
 * Main dashboard component.
 */
class Dashboard extends React.Component {
    render() {
        return (
            <div className={styles.dashboard}>
                <SocketWrapper>
                    <Temperature />
                </SocketWrapper>
            </div>
        );
    }
}

export default Dashboard;
