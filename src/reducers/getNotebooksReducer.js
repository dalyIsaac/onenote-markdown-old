import { PUT_ALL_NOTEBOOKS, CLEAR_ALL_NOTEBOOKS } from "./../actionTypes";

export default function notebooksReducer(state = [], action) {
  switch (action.type) {
    case CLEAR_ALL_NOTEBOOKS:
      return [];
    case PUT_ALL_NOTEBOOKS:
      let data = [];
      if (
        state.filter(x => x.user.displayableId === action.user.displayableId)
      ) {
        data = [
          ...state,
          {
            user: action.user,
            notebooks: action.notebooks
          }
        ];
      }
      return data;
    default:
      return state;
  }
}
