import Immutable from 'immutable';

import types from 'store/types';

const initialState = Immutable.Map();

export default function reducer(state = initialState, action = {}) {
    const newData = action.payload;

    switch (action.type) {
        case types.GOT_CONFIG:
            const { id } = newData;
            return state.set(id, newData);

        case types.INITIAL_CONFIGS:
            return Immutable.fromJS(newData);
    }

    return state;
}
