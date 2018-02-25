import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    router: routerReducer,
    users: userReducer
});
