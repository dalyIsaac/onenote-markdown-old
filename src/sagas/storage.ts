import * as localforage from "localforage";
import { call } from "redux-saga/effects";

/**
 * Sets an object using localforage
 * @param index Index of the data to set
 * @param data Data to set
 */
export function* storageSetItem(index: string, data: any) {
  try {
    yield call([localforage, localforage.setItem], index, data);
  } catch (error) {
    console.error(`localforage could not write ${data} to ${index}`);
    console.error(error);
  }
}

/**
 * Returns a promise of the desired item in localforage
 * @param index
 * @returns
 */
export function storageGetItem(index: string) {
  return localforage.getItem(index);
}

export function* storageGetItems() {
  const output = {};
  yield call([localforage, localforage.iterate], (value: any, key: string) => {
    if (!Array.isArray(value)) {
      output[key] = value;
    }
  });
  return output;
}

export function storageRemoveItem(index: string) {
  return localforage.removeItem(index);
}
