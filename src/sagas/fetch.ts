import { call } from "redux-saga/effects";
import { getToken } from "./authentication";
// import 'whatwg-fetch';

export enum responseTypes {
  JSON = 1,
  BLOB = 2,
  TEXT = 3
}

export function* get(
  url: string,
  userId: string,
  responseType = responseTypes.JSON
) {
  try {
    const token = yield call(getToken, userId);
    const response = yield call(fetch, url, {
      headers: { Authorization: `Bearer ${token}` },
      method: "GET"
    });
    if (response.ok === false) {
      return { error: { ...response } };
    }
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
