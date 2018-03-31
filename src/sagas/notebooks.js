import { call, put, select } from "redux-saga/effects";
import { getToken, currentToken } from "./index";
import { stableUrl } from "../constants";
import { getNotebooks, notebooks } from "../actions";
import { Notebook } from "./../types";

import axios from "axios";

import localForage from 'localforage';

const getUsers = state => state.users;

/**
 * Gets a list of all of the notebooks which belong to the signed in users
 */
export function* getAllNotebooks(action) {
  yield put(getNotebooks.clearAllNotebooks());
  const userList = yield select(getUsers);
  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    yield call(getToken, action.app, user);
    if (currentToken !== "") {
      const result = yield call(axios, {
        method: "get",
        url: stableUrl + "me/onenote/notebooks",
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      yield put(getNotebooks.putAllNotebooks(user, result.data.value));
    }
  }
}

export function* setItem(action) {
  console.log("I'm going to try and set an item");
  const bigValue = {
    randomNumber: 90123123,
    anotherObject: {
      hello: "world",
      anotherObject: {
        hello: "world"
      }
    }
  };
  try {
    yield call([localForage, localForage.setItem], "bigValue", bigValue);
    console.info("Data written");
  } catch (error) {
    console.error(error);
  }
}

export function* getItem(action) {
  console.log("I'm going to try and get an item");
  try {
    const bigValue = yield call([localForage, localForage.getItem], "bigValue")
    console.log(bigValue)
  } catch (error) {
    console.log(error)
  }
}

export function* openNotebooks(action) {
  for (let i = 0; i < action.notebooks.length; i++) {
    const element = action.notebooks[i];
    const user = element.user;
    yield call(getToken, action.app, user);
    if (currentToken !== "") {
      const result = yield call(axios, {
        method: "get",
        url: stableUrl + "me/onenote/notebooks/" + element.notebook.id,
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      const newNotebook = new Notebook(result.data, user);
      yield put(notebooks.loadNotebook(newNotebook));
    }
  }
}
