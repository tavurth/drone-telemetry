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
