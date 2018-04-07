import { PUT_ALL_NOTEBOOKS, CLEAR_ALL_NOTEBOOKS } from "./../actionTypes";

export default function notebooksReducer(state = [], action) {
  switch (action.type) {
    case CLEAR_ALL_NOTEBOOKS:
      return [];
    case PUT_ALL_NOTEBOOKS:
      return [
        ...state,
        {
          userId: action.userId,
          displayableId: action.displayableId,
          notebooks: action.notebooks
        }
      ];
    default:
      return state;
  }
}
