import { PUT_ALL_NOTEBOOKS } from "./../types";

export default function notebooksReducer(state = [], action) {
  switch (action.type) {
    case PUT_ALL_NOTEBOOKS:
      return {
        user: action.user,
        notebooks: action.notebooks
      };
    default:
      return state;
  }
}
