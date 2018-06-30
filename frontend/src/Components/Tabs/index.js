import React from 'react';

import cc from 'utils/classcat';
import styles from './styles.scss';

/**
 * Main tabs component.
 */
class Tabs extends React.PureComponent {
    state = { tabSelected: 0 };

    getTabsConfig() {
        return [];
    }

    setTab = event => {
        const tabSelected = parseInt(event.target.dataset.tabIndex);
        this.setState({ tabSelected });
    };

    isTabActive(index) {
        return index === this.state.tabSelected;
    }

    getTabButton = (config = {}, index = 0) => {
        const { title } = config;

        const className = cc(styles.tab, {
            [styles.tab__active]: this.isTabActive(index),
        });

        return (
            <div onClick={this.setTab} data-tab-index={index} className={className} key={index}>
                {title}
            </div>
        );
    };

    getTabs() {
        return <div className={styles.tab__header}>{this.getTabsConfig().map(this.getTabButton)}</div>;
    }

    getCurrentTab() {
        return this.getTabsConfig()[this.state.tabSelected] || {};
    }

    getCurrentTabContent() {
        const Component = this.getCurrentTab().component || null;

        return (
            <div className={styles.tab__content}>
                <Component {...this.props} />
            </div>
        );
    }

    render() {
        return (
            <div className={styles.tabs__area}>
                {this.getTabs()}
                {this.getCurrentTabContent()}
            </div>
        );
    }
}

export default Tabs;
