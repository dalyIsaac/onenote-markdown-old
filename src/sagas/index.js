import { UserData, AUTHENTICATE, SIGN_IN, SIGN_OUT, GET_PHOTO } from './../types';
import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';
import { graphScopes } from '../constants';
import * as actions from '../actions';
import axios from 'axios';

const stableUrl = 'https://graph.microsoft.com/v1.0/';
const betaUrl = 'https://graph.microsoft.com/beta/';

let currentToken = '';

export default function* rootSaga() {
    yield takeLatest(AUTHENTICATE, authenticate);
    yield takeLatest(SIGN_IN, signIn);
    yield takeLatest(SIGN_OUT, signOut);
    yield takeEvery(GET_PHOTO, getPhoto)
}

function* authenticate(action) {
    const userList = action.app.getAllUsers();
    if (userList.length === 0) {
        return;
    }
    const userDataList = userList.map(x => new UserData(x));
    yield put(actions.newUserList(userDataList));
    for (let i = 0; i < userDataList.length; i++) {
        const user = userDataList[i];
        yield put(actions.getPhoto(user.msal));
    }
}

function* signIn(action) {
    yield call([action.app, action.app.loginRedirect], graphScopes);
    // no need for a put because the app redirects
}

function* signOut(action) {
    yield call([action.app, action.app.logout]);
    // no need for a put because the app redirects
}


function* getToken(app, user) {
    try {
        currentToken = yield call([app, app.acquireTokenSilent], graphScopes, null, user);
    } catch (error) {
        currentToken = '';
        console.error(`Token error for ${user}: ${error} `);
        const newUser = UserData(user.msal, '', error)
        yield put(actions.updateUser(newUser));
    }
}

function* getPhoto(action) {
    yield call(getToken, action.app, action.user);
    if (currentToken !== '') {
        try {
            const result = yield call(axios, {
                method: 'get',
                responseType: 'blob',
                url: betaUrl + 'me/photo/$value',
                headers: { Authorization: `Bearer ${currentToken}` }
            });
            const photo = result.data && blobUrl(result.data);
            const newUser = new UserData(action.user, photo);
            yield put(actions.updateUser(newUser))
        } catch (error) {
            console.error(`Getting photo failed for ${action.user.displayableId}: ${error}`);
        }
    } else {
        console.error('No token');
    }
}

const urls = new WeakMap();

// code courtesy of https://www.bignerdranch.com/blog/dont-over-react/
const blobUrl = blob => {
    if (urls.has(blob)) {
      return urls.get(blob)
    } else {
      let url = URL.createObjectURL(blob)
      urls.set(blob, url)
      return url
    }
  }