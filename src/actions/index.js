import * as Msal from 'msal';
import { appId, cacheLocation } from '../constants';
import { AUTHENTICATE, SIGN_IN, SIGN_OUT, GET_PHOTO, NEW_USER_LIST, UPDATE_USER } from '../types';

let app;

/** 
 * Creates an action to start the authentication process with MSAL
*/
export function authenticate() {
    const redirectUri = window.location.href.includes('localhost:3000') ? 'http://localhost:3000' : '';    
    app = new Msal.UserAgentApplication(
        appId,
        '',
        () => {
            // callback
        },
        {
            cacheLocation,
            redirectUri,
            postLogoutRedirectUri: redirectUri
        });
    return {
        type: AUTHENTICATE,
        app
    };
}

/** 
 * Creates an action to start the signin process with MSAL
*/
export const signIn = () => ({
    type: SIGN_IN,
    app
});

/** 
 * Creates an action to start the signout process with MSAL
*/
export const signOut = () => ({
    type: SIGN_OUT,
    app
});

/**
 * Creates an action to replace the user list with a new user list
 * @param {UserData} users 
 */
export const newUserList = (users) => ({
    type: NEW_USER_LIST,
    users
});

/**
 * Creates an action to update a user
 * @param {UserData} user 
 */
export const updateUser = (user) => ({
    type: UPDATE_USER,
    user
});

/**
 * Creates an action to get the user's photo
 * @param {UserData} user 
 */
export const getPhoto = (user) => ({
    type: GET_PHOTO,
    app,
    user
});
