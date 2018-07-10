import types from 'store/types';
import SocketWrapper from 'utils/SocketWrapper';
import { dispatch } from 'store/store';

import { getConfig } from 'store/selectors';
import { getDataBufferSize, getMaxBufferSize } from 'store/selectors/config';

import { objectFromGroups } from './helpers';

export function addDataSample(newData = {}) {}

const dataBuffer = {};
export function gotData(newData = {}) {
    const { type } = newData;

    const bufferSize = getDataBufferSize();

    // Create the type array if it does not exist
    if (dataBuffer[type] instanceof Array === false) {
        dataBuffer[type] = [];
    }

    // Defer dispatches
    dataBuffer[type].push(newData);
    if (dataBuffer[type].length < bufferSize) {
        return;
    }

    dispatch({
        type: types.ADD_DATA,
        maxSize: getMaxBufferSize(),
        payload: { type, data: dataBuffer[type] },
    });

    dataBuffer[type] = [];
}

export function gotInitialData(newData = []) {
    dispatch({
        type: types.INITIAL_DATA,
        maxSize: getMaxBufferSize(),
        payload: objectFromGroups(newData),
    });
}

export async function getInitialData(initialSize) {
    const ws = await SocketWrapper.waitForSocket();
    ws.emit('data:initial', initialSize, gotInitialData);
}
