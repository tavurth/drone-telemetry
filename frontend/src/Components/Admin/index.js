import React from 'react';
import Input from 'react-toolbox/lib/input';
import Switch from 'react-toolbox/lib/switch';

import { connect } from 'react-redux';

import Tabs from 'components/Tabs';
import websocket from 'utils/SocketWrapper';
import { getConfig } from 'store/selectors';

import styles from './styles.scss';

class AdminPanel extends Tabs {
    updateConfig(nextProps, force = false) {
        const { config } = nextProps;

        if (config === this.props.config && !force) {
            return;
        }

        this.setState({ config });
    }

    componentWillReceiveProps(nextProps) {
        this.updateConfig(nextProps);
    }
    componentWillMount() {
        this.updateConfig(this.props, true);
    }

    sendConfig = () => {
        const { config } = this.state;
        websocket.emit('changeConfig', {
            config,
            id: 'drone-configuration',
        });
    };

    updateBlockValue(key, valueKey, value) {
        const { state } = this;
        const { config } = state;
        const currentValue = config[key];

        this.setState({
            ...this.state,
            config: {
                ...config,
                [key]: {
                    ...currentValue,
                    [valueKey]: value,
                },
            },
        });
    }

    getConfigBlock = (config, key) => {
        const { type, ...rest } = config;

        switch (type) {
            case 'text':
                return <Input {...rest} key={key} onChange={this.updateBlockValue.bind(this, key, 'value')} />;

            case 'toggle':
                return <Switch {...rest} key={key} onChange={this.updateBlockValue.bind(this, key, 'checked')} />;
        }
    };

    getConfigBlocks() {
        const { config } = this.state;
        return Object.keys(config).map(key => this.getConfigBlock(config[key], key));
    }

    getControlsTab = () => {
        return (
            <div className={styles.admin__tab}>
                {this.getConfigBlocks()}
                <a onClick={this.sendConfig} className={styles.button__update}>
                    Update drone settings
                </a>
            </div>
        );
    };

    getTabsConfig() {
        return [
            {
                title: 'Controls',
                component: this.getControlsTab,
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

AdminPanel = connect(getConfig('drone-configuration.config', { as: 'config' }))(AdminPanel);

export default AdminPanel;
