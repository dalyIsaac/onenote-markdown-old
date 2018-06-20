import {
    CLEAR_ALL_NOTEBOOKS,
    GET_ALL_NOTEBOOKS,
    PUT_ALL_NOTEBOOKS
  } from "../actionTypes";
import { Notebook } from "../types/Notebook";
  
  export const getAllNotebooks = () => ({
    type: GET_ALL_NOTEBOOKS
  });
  
  /**
   * Puts freshly fetched notebooks into the store
   */
  export const putAllNotebooks = (userId: string, displayableId: string, notebooks: Notebook[]) => ({
    displayableId,
    notebooks,
    type: PUT_ALL_NOTEBOOKS,
    userId
  });
  
  export const clearAllNotebooks = () => ({
    type: CLEAR_ALL_NOTEBOOKS
  });
  