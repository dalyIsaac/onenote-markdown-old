import { NEW_USER_LIST, UPDATE_USER } from "./../types/";

export default function userReducer(state = [], action) {
  switch (action.type) {
    case NEW_USER_LIST:
      return action.users;
    case UPDATE_USER:
      let userList = [];
      state.forEach(element => {
        if (element.msal.displayableId === action.user.msal.displayableId) {
          userList.push(action.user);
        } else {
          userList.push(element);
        }
      });
      return userList;
    default:
      return state;
  }
}
