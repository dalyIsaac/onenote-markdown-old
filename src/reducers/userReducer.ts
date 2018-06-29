import { IStateUsers } from ".";
import { IActionUser } from "../actions";
import { INewUserObject } from "../actions/authentication";
import { NEW_USER_OBJECT, UPDATE_USER } from "./../actionTypes";

type actionType = INewUserObject & IActionUser;

export default function userReducer(
  state: IStateUsers = {},
  action: actionType
) {
  switch (action.type) {
    case NEW_USER_OBJECT:
      return action.users;
    case UPDATE_USER:
      const users = { ...state };
      users[action.user.userIdentifier] = action.user;
      return users;
    default:
      return state;
  }
}
