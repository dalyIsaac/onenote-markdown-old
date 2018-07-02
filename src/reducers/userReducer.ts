import { IStateUsers } from ".";
import { IAction, IActionUser } from "../actions";
import { INewUserObject } from "../actions/authentication";
import { NEW_USER_OBJECT, UPDATE_USER } from "./../actionTypes";

export default function userReducer(
  state: IStateUsers = {},
  action: IAction
) {
  switch (action.type) {
    case NEW_USER_OBJECT:
      return (action as INewUserObject).users;
    case UPDATE_USER:
      const users = { ...state };
      users[(action as IActionUser).user.userIdentifier] = (action as IActionUser).user;
      return users;
    default:
      return state;
  }
}
