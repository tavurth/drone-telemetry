import React from 'react';

class SocketWrapper {
    constructor(props) {
        this.setup();
    }

    setup() {
        const host = `ws://${window.location.host}`;

        this.websocket = io(host, {
            transports: ['polling', 'websocket'],
        });

        // Export this class as if we're a websocket connection
        for (let key in this.websocket) {
            if (this.websocket[key] instanceof Function) {
                this[key] = this.websocket[key].bind(this.websocket);
            }
        }

        this.setupFunctions();
    }

    setupFunctions() {
        this.on('connect_error', console.error);
        this.on('connect_timeout', console.error);
        this.on('reconnect_error', console.error);
        this.on('reconnect_timeout', console.error);
    }

    waitForSocket = () => {
        return new Promise(res => {
            let interval;

            const check = () => {
                if (this.websocket.connected) {
                    clearInterval(interval);
                    return res(this);
                }
            };

            interval = setInterval(check, 200);
        });
    };

    getWebsocket = () => {
        return this.websocket;
    };
}

export default new SocketWrapper();
