import { combineReducers } from 'redux';

import config from './config';
import telemetry from './telemetry';

const reducers = {
    config,
    telemetry,
};

export default combineReducers(reducers);
