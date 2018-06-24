import React from 'react';

import styles from './App.scss';
import Dashboard from './Dashboard';

class App extends React.Component {
    render() {
        return (
            <div className={styles.App}>
                <Dashboard />
            </div>
        );
    }
}

export default App;
