import * as localforage from "localforage";
import { call } from "redux-saga/effects";

enum StorageType {
  localStorage = "localStorage"
}

const storage = {
  localStorage: localforage.createInstance({
    driver: localforage.LOCALSTORAGE,
    name: "localStorage"
  })
};

export function* localStorageSetItem(index: string, data: any) {
  yield call(storageSetItem, index, data, StorageType.localStorage);
}

export function* localStorageGetItem(index: string) {
  return yield call(storageGetItem, index, StorageType.localStorage);
}

export function* localStorageGetItems() {
  return yield call(storageGetItems, StorageType.localStorage);
}

export function* localStorageRemoveItem(index: string) {
  return yield call(storageRemoveItem, index, StorageType.localStorage);
}

function* storageSetItem(index: string, data: any, storageType: StorageType) {
  const box: LocalForage = storage[storageType];
  try {
    yield call([box, box.setItem], index, data);
  } catch (error) {
    console.error(
      `localForage could not write ${data} to ${index}, in ${storageType}`
    );
    console.error(error);
  }
}

function* storageGetItem(index: string, storageType: StorageType) {
  const box: LocalForage = storage[storageType];
  return yield call([box, box.getItem], index);
}

function* storageGetItems(storageType: StorageType) {
  const box: LocalForage = storage[storageType];
  const output = {};
  yield call([box, box.iterate], (value: any, key: string) => {
    if (!Array.isArray(value)) {
      output[key] = value;
    }
  });
  return output;
}

function* storageRemoveItem(index: string, storageType: StorageType) {
  const box: LocalForage = storage[storageType];
  return yield call([box, box.removeItem], index);
}
