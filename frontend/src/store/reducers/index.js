import { combineReducers } from 'redux';
import telemetry from './telemetry';

const reducers = {
    telemetry,
};

export default combineReducers(reducers);
