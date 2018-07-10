import React from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import Input from 'react-toolbox/lib/input';
import Switch from 'react-toolbox/lib/switch';
import Slider from 'react-toolbox/lib/slider';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import { connect } from 'react-redux';

import Tabs from 'components/Tabs';
import websocket from 'utils/SocketWrapper';
import { getConfig } from 'store/selectors';
import { changeCacheSize, changeInitialSize } from 'store/actions/config';

import styles from './styles.scss';

class AdminPanel extends Tabs {
    updateConfig(nextProps, force = false) {
        const { config } = nextProps;

        if (isEqual(config, this.props.config) && !force) {
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

        const newState = {
            ...this.state,
            config: {
                ...config,
                [key]: {
                    ...currentValue,
                    [valueKey]: value,
                },
            },
        };

        this.setState(newState, afterLoadingState => {
            if (valueKey === 'checked') {
                this.sendConfig();
            }
        });
    }

    getConfigBlock = (fullConfig, config, key) => {
        const { type, showIf, ...rest } = config;

        if (showIf !== undefined && get(fullConfig, showIf, false) === false) {
            return null;
        }

        switch (type) {
            case 'text':
                return <Input {...rest} key={key} onChange={this.updateBlockValue.bind(this, key, 'value')} />;

            case 'toggle':
                return <Switch {...rest} key={key} onChange={this.updateBlockValue.bind(this, key, 'Slider')} />;

            case 'progress':
                return <ProgressBar {...rest} className={styles.progress} key={key} />;
        }
    };

    getConfigBlocks() {
        const { config } = this.state;
        return Object.keys(config).map(key => this.getConfigBlock(config, config[key], key));
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

    getTableConfigBlocks() {
        const { webConfig } = this.props;
        return [
            <p key="update-cache-text">Update cache size</p>,
            <Slider
                editable
                min={0}
                max={40}
                step={5}
                label="Cache size"
                key="rolling-cache-updates"
                onChange={changeCacheSize}
                value={webConfig.cacheSize}
                className={styles.config__slider}
            />,
            <p key="initial-cache-text">Initial cache size</p>,
            <Slider
                editable
                min={50}
                max={2000}
                step={100}
                label="Initial size"
                key="initial-data-size"
                onChange={changeInitialSize}
                value={webConfig.initialSize}
                className={styles.config__slider}
            />,
        ];
    }

    getTableConfigTab = () => {
        return <div className={styles.admin__tab}>{this.getTableConfigBlocks()}</div>;
    };

    getTabsConfig() {
        return [
            {
                title: 'Controls',
                component: this.getControlsTab,
            },
            {
                title: 'Table setup',
                component: this.getTableConfigTab,
            },
            {
                title: 'Information',
                component: () => <span>General information to go here</span>,
            },
        ];
    }
}

AdminPanel = connect(getConfig('web-config', { as: 'webConfig' }))(AdminPanel);
AdminPanel = connect(getConfig('drone-configuration.config', { as: 'config' }))(AdminPanel);

export default AdminPanel;
