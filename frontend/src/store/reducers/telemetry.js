import types from '../types';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
    const newData = action.payload;

    switch (action.type) {
        case types.INITIAL_DATA:
            return { ...state, ...newData };

        case types.ADD_DATA:
            const { type } = newData;

            const currentData = state[type] || [];
            return { ...state, [type]: currentData.concat(newData) };
    }

    return state;
}
