import {
  GET_ALL_NOTEBOOKS,
  PUT_ALL_NOTEBOOKS,
  CLEAR_ALL_NOTEBOOKS
} from "../types";
import { app } from "./index";

export const getAllNotebooks = () => ({
  type: GET_ALL_NOTEBOOKS,
  app
});

export const putAllNotebooks = (user, notebooks) => ({
  type: PUT_ALL_NOTEBOOKS,
  user,
  notebooks
});

export const clearAllNotebooks = () => ({
  type: CLEAR_ALL_NOTEBOOKS
});
