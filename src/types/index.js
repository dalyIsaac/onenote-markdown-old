import * as Msal from 'msal';

// ActionTypes
export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const NEW_USER_LIST = 'NEW_USER_LIST';

export class UserData {
    constructor(msal, photo = '') { 
        this.msal = msal;
        this.photo = photo;
    }
}
