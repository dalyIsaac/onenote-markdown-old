import * as Msal from 'msal';
import { appId, cacheLocation } from '../constants';
import { AUTHENTICATE, SIGN_IN, SIGN_OUT } from '../types';

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

export function signIn() {
    return {
        type: SIGN_IN,
        app
    };
}

export function signOut() {
    return {
        type: SIGN_OUT,
        app
    };
}
