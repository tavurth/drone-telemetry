import Cookie from 'js-cookie';
import SocketWrapper from 'utils/SocketWrapper';

import { gotData, gotInitialData } from './data';
import { gotConfig, gotInitialConfigs } from './config';

export async function getInitial() {
    const ws = await SocketWrapper.waitForSocket();

    ws.on('data', gotData);
    ws.on('config', gotConfig);

    // Asking for our initial data
    ws.emit('data:initial', gotInitialData);
    ws.emit('config:initial', gotInitialConfigs);
}

getInitial();
