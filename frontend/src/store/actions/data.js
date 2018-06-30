import types from 'store/types';
import { dispatch } from 'store/store';

import { objectFromGroups } from './helpers';

export function gotData(newData = {}) {
    dispatch({
        payload: newData,
        type: types.ADD_DATA,
    });
}

export function gotInitialData(newData = []) {
    dispatch({
        type: types.INITIAL_DATA,
        payload: objectFromGroups(newData),
    });
}
