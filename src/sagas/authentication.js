import { call, put } from 'redux-saga/effects';

import { UserData, AUTHENTICATE, SIGN_IN, SIGN_OUT, GET_PHOTO } from './../types';
import { authentication }from '../actions';
import { graphScopes } from '../constants';
import { betaUrl, blobUrl } from './index';

import axios from 'axios';

let currentToken = '';

export function* authenticate(action) {
    const userList = action.app.getAllUsers();
    if (userList.length > 0) {
        const userDataList = userList.map(x => new UserData(x));
        yield put(authentication.newUserList(userDataList));
        for (let i = 0; i < userDataList.length; i++) {
            const user = userDataList[i];
            yield put(authentication.getPhoto(user.msal));
        }
    }
}

export function* signIn(action) {
    yield call([action.app, action.app.loginRedirect], graphScopes);
    // no need for a put because the app redirects
}

export function* signOut(action) {
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
        yield put(authentication.updateUser(newUser));
    }
}

export function* getPhoto(action) {
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
            yield put(authentication.updateUser(newUser))
        } catch (error) {
            console.error(`Getting photo failed for ${action.user.displayableId}: ${error}`);
        }
    } else {
        console.error('No token');
    }
}