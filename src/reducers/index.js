import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './userReducer';
import getNotebooksReducer from './getNotebooksReducer';
import notebooksReducer from './notebooksReducer';
import notebookOrderReducer from './notebookOrderReducer'
import selectedNavReducer from './selectedNavReducer';
import totalNotebookLength from './totalNotebookLengthReducer';

export default combineReducers({
    router: routerReducer,
    users: userReducer,
    allNotebooks: getNotebooksReducer, // used for opening notebooks
    notebooks: notebooksReducer, // used for the open notebooks
    notebookOrder: notebookOrderReducer,
    selectedNav: selectedNavReducer,
    totalNotebookLength: totalNotebookLength
});
