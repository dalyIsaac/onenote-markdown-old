import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './userReducer';
import getNotebooksReducer from './getNotebooksReducer';
import notebooksReducer from './notebooksReducer';
import notebookOrderReducer from './notebookOrderReducer'

export default combineReducers({
    router: routerReducer,
    users: userReducer,
    allNotebooks: getNotebooksReducer, // used for opening notebooks
    notebooks: notebooksReducer, // used for the open notebooks
    notebookOrder: notebookOrderReducer
});
