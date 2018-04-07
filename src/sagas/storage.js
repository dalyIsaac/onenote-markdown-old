import { call } from "redux-saga/effects";
import localforage from "localforage";

/**
 * Sets an object using localforage
 * @param {string} index Index of the data to set
 * @param {any} data Data to set
 */
export function* storageSetItem(index, data) {
  try {
    yield call([localforage, localforage.setItem], index, data);
  } catch (error) {
    console.error(`localforage could not write ${index} to ${data}`);
    console.error(error);
  }
}

/**
 * Returns a promise of the desired item in localforage
 * @param {any} index 
 * @returns 
 */
export function storageGetItem(index) {
  return localforage.getItem(index);
}

export function* storageGetItems() {
  let output = {};
  yield call([localforage, localforage.iterate],
    (value, key) => {
      if (!Array.isArray(value)) {
        output[key] = value;
      }
    }
  );
  return output;
}

export function storageRemoveItem(index) {
  return localforage.removeItem(index);
}
