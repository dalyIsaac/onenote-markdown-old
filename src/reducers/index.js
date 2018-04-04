import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './userReducer';
import allNotebooksReducer from './allNotebooksReducer';
import notebooksReducer from './notebooksReducer';
import sectionGroupsReducer from './sectionGroupsReducer';
import notebookOrderReducer from './notebookOrderReducer'
import selectedNavReducer from './selectedNavReducer';
import totalNotebookLength from './totalNotebookLengthReducer';

export default combineReducers({
    router: routerReducer,
    users: userReducer,
    allNotebooks: allNotebooksReducer, // used for opening notebooks
    notebooks: notebooksReducer, // used for the open notebooks
    sectionGroups: sectionGroupsReducer,
    notebookOrder: notebookOrderReducer,
    selectedNav: selectedNavReducer,
    totalNotebookLength: totalNotebookLength
});
