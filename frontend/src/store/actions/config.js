import types from 'store/types';
import { dispatch } from 'store/store';

import { objectFromGroups } from './helpers';

export function gotConfig(newConfig = []) {
    dispatch({
        payload: newConfig,
        type: types.GOT_CONFIG,
    });
}

export function gotInitialConfigs(newConfigs = []) {
    dispatch({
        type: types.INITIAL_CONFIGS,
        payload: objectFromGroups(newConfigs),
    });
}
