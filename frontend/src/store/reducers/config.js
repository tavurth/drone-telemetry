import Immutable from 'immutable';

import types from 'store/types';

const initialState = Immutable.fromJS({
    'web-config': { cacheSize: 8, initialSize: 500 },
});

export default function reducer(state = initialState, action = {}) {
    const newData = action.payload;

    switch (action.type) {
        case types.GOT_CONFIG:
            const { id } = newData;
            return state.mergeDeep({ [id]: newData });

        case types.INITIAL_CONFIGS:
            return state.mergeDeep(Immutable.fromJS(newData));

        case types.CACHE_SIZE:
            const { normal } = action;
            return state.setIn(['web-config', normal], action.payload);
    }

    return state;
}
