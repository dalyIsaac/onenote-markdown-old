// ActionTypes
// Users
export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const NEW_USER_LIST = 'NEW_USER_LIST';
export const UPDATE_USER = 'UPDATE_USER';
// Graph
export const GET_PHOTO = 'GET_PHOTO';

export class UserData {
    constructor(msal, photo = '', error = null) {
        this.msal = msal;
        this.photo = photo;
        this.error = error;
    }
}
