import { createStore } from 'redux';

import './actions';
import telemetry from './reducers';
import { setStore } from './store';

const store = createStore(telemetry);

setStore(store);

export default store;
