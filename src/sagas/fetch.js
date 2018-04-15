import { call } from "redux-saga/effects";
import { getToken } from "./authentication";
import 'whatwg-fetch';

export const responseTypes = Object.freeze({
    "JSON": 1,
    "BLOB": 2,
    "TEXT": 3
});

export function* get(url, userId, responseType = responseTypes.JSON) {
    try {
        const token = yield call(getToken, userId);
        const response = yield call(fetch, url, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        switch (responseType) {
            case responseTypes.JSON:
                return yield call([response, response.json]);
            case responseTypes.BLOB:
                return yield call([response, response.blob]);
            case responseTypes.TEXT:
                return yield call([response, response.text]);
            default:
                return response;
        }
    } catch (error) {
        console.error(error);
        return { error };
    }
}
