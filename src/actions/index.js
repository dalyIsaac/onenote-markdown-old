import * as Msal from 'msal';
import { appId, cacheLocation } from '../constants';
import { AUTHENTICATE, SIGN_IN, SIGN_OUT, GET_PHOTO, NEW_USER_LIST, UPDATE_USER } from '../types';

let app;

export function authenticate() {
    app = new Msal.UserAgentApplication(
        appId,
        '',
        () => {
            // callback
        },
        {
            cacheLocation
        });
    return {
        type: AUTHENTICATE,
        app
    };
}

export const signIn = () => ({
    type: SIGN_IN,
    app
});

export const signOut = () => ({
    type: SIGN_OUT,
    app
});

export const newUserList = (users) => ({
    type: NEW_USER_LIST,
    users
});

export const updateUser = (user) => ({
    type: UPDATE_USER,
    user
});

export const getPhoto = (user) => ({
    type: GET_PHOTO,
    app,
    user
});
