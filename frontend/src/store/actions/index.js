import Cookie from 'js-cookie';
import SocketWrapper from 'utils/SocketWrapper';

import { gotData, gotInitialData, getInitialData } from './data';
import { gotConfig, gotInitialConfigs } from './config';

export async function getInitial() {
    const ws = await SocketWrapper.waitForSocket();

    ws.on('data', gotData);
    ws.on('config', gotConfig);

    // Asking for our initial data
    getInitialData();
    ws.emit('config:initial', gotInitialConfigs);
}

getInitial();
