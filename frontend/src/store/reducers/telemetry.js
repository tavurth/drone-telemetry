import Immutable from 'immutable';

import types from '../types';

const initialState = Immutable.Map();

export default function reducer(state = initialState, action = {}) {
    const newData = action.payload;

    switch (action.type) {
        case types.INITIAL_DATA:
            return Immutable.fromJS(newData);

        case types.ADD_DATA:
            const { type, data, maxSize } = newData;

            const currentData = state.get(type) || Immutable.List();
            return state.set(type, currentData.concat(data).slice(-maxSize));
    }

    return state;
}
