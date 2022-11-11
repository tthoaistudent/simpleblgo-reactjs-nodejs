// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import auth from './auth';
import message from './message'

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, auth, message});

export default reducers;
