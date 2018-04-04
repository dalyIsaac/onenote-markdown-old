import {
  GET_ALL_NOTEBOOKS,
  PUT_ALL_NOTEBOOKS,
  CLEAR_ALL_NOTEBOOKS
} from "../actionTypes";
import { app } from "./index";
import { UserData } from '../types'; // eslint-disable-line

export const getAllNotebooks = () => ({
  type: GET_ALL_NOTEBOOKS,
  app
});

/**
 * Puts freshly fetched notebooks into the store
 * @param {UserData} user 
 * @param {any} notebooks 
 */
export const putAllNotebooks = (user, notebooks) => ({
  type: PUT_ALL_NOTEBOOKS,
  user,
  notebooks
});

export const clearAllNotebooks = () => ({
  type: CLEAR_ALL_NOTEBOOKS
});
