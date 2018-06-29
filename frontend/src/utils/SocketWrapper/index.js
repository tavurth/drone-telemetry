import React from 'react';
import { gotData, gotInitialData } from 'store/actions';

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

        // Export this class as if we're a websocket connection
        for (let key in this.websocket) {
            if (this.websocket[key] instanceof Function) {
                this[key] = this.websocket[key].bind(this.websocket);
            }
        }
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
