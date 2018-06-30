import { createStore } from 'redux';

import './actions';
import telemetry from './reducers';
import { setStore } from './store';

function getDevTools() {
    return window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(telemetry, getDevTools());

setStore(store);

export default store;
