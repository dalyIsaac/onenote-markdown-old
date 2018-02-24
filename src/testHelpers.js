import * as Msal from 'msal';
import { appId, cacheLocation } from './constants';

export const storageSetup = () => {
    window.localStorage = storageFake;
    window.sessionStorage = storageFake;
    global.window = window;
    global.localStorage = storageFake;
    global.sessionStorage = storageFake;
};

const storageFake = function () {
    var store = {};

    var accessTokenCacheItem = {
        key: {
            authority: '',
            clientId: '',
            scopes: '',
            userIdentifer: ''
        },
        value: {
            accessToken: '',
            idToken: '',
            expiresIn: '',
            clientInfo: ''
        }
    }

    return {
        getItem: function (key) {
            return store[key];
        },
        setItem: function (key, value) {
            if (typeof value != 'undefined') {
                store[key] = value;
            }
        },
        removeItem: function (key) {
            if (typeof store[key] != 'undefined') {
                delete store[key];
            }
        },
        clear: function () {
            store = {};
        },
        storeVerify: function () {
            return store;
        },
        getAllAccessTokens: function (clientId, userIdentifier) {
            var results = [];
            for (var key in store) {
                if (store.hasOwnProperty(key)) {
                    if (key.match(clientId) && key.match(userIdentifier)) {
                        let value = this.getItem(key);
                        if (value) {
                            accessTokenCacheItem = {};
                            accessTokenCacheItem.key = JSON.parse(key);
                            accessTokenCacheItem.value = JSON.parse(value);
                            results.push(accessTokenCacheItem);
                        }
                    }
                }
            }
            return results;
        }
    };
}();

export const getUserAgentApplication = () => new Msal.UserAgentApplication(
    appId,
    '',
    () => {
        // callback
    },
    {
        cacheLocation
    }
);
