import * as localforage from "localforage";
import { call } from "redux-saga/effects";

enum StorageType {
  indexeddbStorage = "indexeddbStorage"
}

const storage = {
  indexeddbStorage: localforage.createInstance({
    driver: localforage.INDEXEDDB,
    name: "msgraphDataStorage"
  })
};

export function* indexeddbStorageSetItem(index: string, data: any) {
  yield call(storageSetItem, index, data, StorageType.indexeddbStorage);
}

export function* indexeddbStorageGetItem(index: string) {
  return yield call(storageGetItem, index, StorageType.indexeddbStorage);
}

export function* indexeddbStorageGetItems() {
  return yield call(storageGetItems, StorageType.indexeddbStorage);
}

export function* indexeddbStorageRemoveItem(index: string) {
  return yield call(storageRemoveItem, index, StorageType.indexeddbStorage);
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
