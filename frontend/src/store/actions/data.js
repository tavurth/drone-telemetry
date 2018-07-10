import types from 'store/types';
import { dispatch } from 'store/store';

import { objectFromGroups } from './helpers';

const dataBuffer = {};
const MAX_DATA_BUFFER_SIZE = 3;
export function gotData(newData = {}) {
    const { type } = newData;

    if (dataBuffer[type] instanceof Array === false) {
        dataBuffer[type] = [];
    }

    // Defer dispatches
    dataBuffer[type].push(newData);
    if (dataBuffer[type].length < MAX_DATA_BUFFER_SIZE) {
        return;
    }

    dispatch({
        type: types.ADD_DATA,
        payload: { type, data: dataBuffer[type] },
    });

    dataBuffer[type] = [];
}

export function gotInitialData(newData = []) {
    dispatch({
        type: types.INITIAL_DATA,
        payload: objectFromGroups(newData),
    });
}
