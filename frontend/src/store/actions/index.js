import Cookie from 'js-cookie';

import SocketWrapper from 'utils/SocketWrapper';

import types from '../types';
import { dispatch } from '../store';

export function gotData(newData = {}) {
    dispatch({
        payload: newData,
        type: types.ADD_DATA,
    });
}

export function gotInitialData(newData = {}) {
    dispatch({
        payload: newData,
        type: types.INITIAL_DATA,
    });
}

export async function getInitial() {
    const ws = await SocketWrapper.waitForSocket();

    ws.on('data', gotData);

    // Asking for our initial data
    ws.emit('data:initial', gotInitialData);
}

getInitial();
