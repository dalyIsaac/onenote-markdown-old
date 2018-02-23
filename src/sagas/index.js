import { UserData, NewUserListAction, AUTHENTICATE, SIGN_IN, SIGN_OUT, NEW_USER_LIST } from './../types';
import { takeLatest, call, put } from 'redux-saga/effects';
import { AuthAction } from '../types';
import { graphScopes } from '../constants';

export default function* rootSaga() {
    yield takeLatest(AUTHENTICATE, authenticate);
    yield takeLatest(SIGN_IN, signIn);
    yield takeLatest(SIGN_OUT, signOut);
}

function* authenticate(action) {
    const userList = action.app.getAllUsers();
    if (userList.length === 0) {
        return;
    }
    const userDataList = userList.map(x => new UserData(x));
    const actionOut = { 
        type: NEW_USER_LIST,
        users: userDataList
    };
    yield put(actionOut);
}

function* signIn(action) {
    yield call([action.app, action.app.loginRedirect], graphScopes);
    // no need for a put because the app redirects
}

function* signOut(action) {
    yield call([action.app, action.app.logout]);
    // no need for a put because the app redirects
}
