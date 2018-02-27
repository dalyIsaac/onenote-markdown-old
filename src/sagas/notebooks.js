import { call, put } from 'redux-saga/effects';
import { getToken, currentToken } from './index';
import { stableUrl } from '../constants';

import axios from 'axios';

export function* getAllNotebooks(action) {
    const userList = yield call([action.app, action.app.getAllUsers]);
    for (let i = 0; i < userList.length; i++) {
        const user = userList[i];
        yield call(getToken, action.app, user);
        if (currentToken !== '') {
            const result = yield call(axios, {
                method: 'get',
                url: stableUrl + 'me/onenote/notebooks',
                headers: { Authorization: `Bearer ${currentToken}` }
            });
            console.log(result);
        }
    }
}
