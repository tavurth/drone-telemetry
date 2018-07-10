import types from 'store/types';
import debounce from 'lodash/debounce';
import { dispatch } from 'store/store';

import { getInitialData } from './data';
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

export function changeCacheSize(newCacheSize) {
    dispatch({
        normal: 'cacheSize',
        payload: newCacheSize,
        type: types.CACHE_SIZE,
    });
}

const debouncedDataFetch = debounce(getInitialData, 800);
export function changeInitialSize(newInitialSize = 500) {
    debouncedDataFetch(newInitialSize);

    dispatch({
        normal: 'initialSize',
        payload: newInitialSize,
        type: types.CACHE_SIZE,
    });
}
