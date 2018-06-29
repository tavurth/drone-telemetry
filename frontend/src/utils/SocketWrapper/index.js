import React from 'react';
import { gotData, gotInitialData } from 'store/actions';

// Remove children from children so we don't double up components
function getCleanedProps({ children, ...props }) {
    return props;
}

// Inject the id list into the component using {this.props.model}
function injectPropsIntoChildren(props, extra = {}) {
    return React.Children.map(props.children, child =>
        React.cloneElement(child, { ...getCleanedProps(props), ...extra })
    );
}

class SocketWrapper {
    constructor(props) {
        this.setup();
    }

    setup() {
        const host = `ws://${window.location.host}`;

        this.websocket = io(host, { transports: ['websocket'] });

        this.websocket.on('connect_error', console.error);
        this.websocket.on('connect_timeout', console.error);
        this.websocket.on('reconnect_error', console.error);
        this.websocket.on('reconnect_timeout', console.error);

        this.websocket.on('data', gotData);
        this.websocket.on('initial-data', gotInitialData);
    }

    waitForSocket = () => {
        return new Promise(res => {
            let interval;

            const check = () => {
                if (this.websocket.connected) {
                    clearInterval(interval);
                    return res(this.websocket);
                }
            };

            setInterval(check, 200);
        });
    };

    getWebsocket = () => {
        return this.websocket;
    };
}

export default new SocketWrapper();
