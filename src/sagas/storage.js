import { call } from "redux-saga/effects";
import { Notebook } from "./../types";
import localforage from "localforage";

/**
 * Sets an object using localforage
 * @param {string} index 
 * @param {any} data 
 */
export function* storageSetItem(index, data, type = "") {
    try {
      if (type === "") {
        yield call([localforage, localforage.setItem], index, data);
      } else {
        yield call([localforage, localforage.setItem], `${type}.${index}`, data);
      }
    } catch (error) {
      console.error(`localforage could not write ${index} to ${data}`);
      console.error(error);
    }
  }
  
  /**
   * Returns a promise of the desired item in localforage
   * @param {any} index 
   * @param {string} [type=""] 
   * @returns 
   */
  export function storageGetItem(index, type = "") {
    if (type === "") {
      return localforage.getItem(index);
    } else {
      return localforage.getItem(`${type}.${index}`);
    }
  }
  
  export function* storageGetItems(type) {
    let outputList = [];
    yield call([localforage, localforage.iterate],
      (value, key) => {
        if (!Array.isArray(value) && key.slice(0, type.length) === type) {
          outputList.push(new Notebook(value));
        }
      }
    );
    return outputList;
  }
  
  export function* storageSetNotebookOrder(notebookOrder) {
    const newOrder = notebookOrder.map(val => "notebook." + val);
    yield call(storageSetItem, "notebookOrder", newOrder);
  }
  