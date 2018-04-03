import * as actions from './authentication';
import { UserData } from '../types';
import * as Msal from 'msal';
import { storageSetup, getUserAgentApplication } from '../testHelpers';

storageSetup();

describe('Tests action creators', () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.sessionStorage.clear();
        global.localStorage.clear();
        global.sessionStorage.clear();
    });

    test('Creates an action to initiate the authentication process', () => {
        const type = 'AUTHENTICATE';
        const app = getUserAgentApplication();
        const testValue = actions.authenticate();
        expect(testValue.type).toBe(type);
        expect(testValue.app).toBeInstanceOf(Msal.UserAgentApplication);
        expect(testValue.app.authority).toEqual(app.authority);
        expect(testValue.app.cacheLocation).toEqual(app.cacheLocation);
        expect(testValue.app.clientId).toEqual(app.clientId);
        expect(testValue.app.validateAuthority).toEqual(app.validateAuthority);
    });

    test('Creates an action to start the sigin process with MSAL', () => {
        const type = 'SIGN_IN';
        const app = getUserAgentApplication();
        const testValue = actions.signIn();
        expect(testValue.type).toBe(type);
        expect(testValue.app).toBeInstanceOf(Msal.UserAgentApplication);
    });

    test('Creates an action to start the signout process with MSAL', () => {
        const type = 'SIGN_OUT';
        const app = getUserAgentApplication();
        const testValue = actions.signOut();
        expect(testValue.type).toBe(type);
        expect(testValue.app).toBeInstanceOf(Msal.UserAgentApplication);
    });

    test('Creates an action to replace the user list with a new user list', () => {
        const type = 'NEW_USER_OBJECT';
        const users = ['user1', 'user2', 'user3'];
        expect(actions.newUserObject(users)).toEqual({ type, users });
    });

    test('Creates an action to update a user', () => {
        const type = 'UPDATE_USER';
        const user = 'user';
        expect(actions.updateUser(user)).toEqual({ type, user });
    });

    test('Creates an action to get a photo', () => {
        const type = 'GET_PHOTO';
        const app = getUserAgentApplication();
        const user = new UserData(new Msal.User('john.smith@contoso.com',
            'John Smith',
            'https://login.microsoftonline.com/common',
            'johnsmithsrandomidentifierstring',
            'johnsmithsIDtoken'
        ));
        const testValue = actions.getPhoto(user);
        expect(testValue.type).toBe(type);
        expect(testValue.app).toBeInstanceOf(Msal.UserAgentApplication);
        expect(testValue.user).toEqual(user);
    });

});