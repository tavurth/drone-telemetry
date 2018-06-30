import types from 'store/types';
import { dispatch } from 'store/store';

import { objectFromGroups } from './helpers';

export function gotConfig(newConfig = []) {
    dispatch({
        type: types.GOT_CONFIG,
        payload: { [newConfig.id]: newConfig },
    });
}

export function gotInitialConfigs(newConfigs = []) {
    dispatch({
        type: types.INITIAL_CONFIGS,
        payload: objectFromGroups(newConfigs),
    });
}
