import { NEW_USER_OBJECT, UPDATE_USER } from "./../types/";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case NEW_USER_OBJECT:
      return action.users;
    case UPDATE_USER:
      let users = { ...state };
      users[action.user.userIdentifier] = action.user;
      return users;
    default:
      return state;
  }
}
