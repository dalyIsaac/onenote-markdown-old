import { user, user1 } from "../../testObjects";
import { UserData } from "../../types/UserData";
import { IStateUsers } from "../index";
import userReducer from "./index";

describe("Reducers: userReducer", () => {
  test("Should return the intial state", () => {
    const initialState = undefined;
    const action = { type: "NOT_AN_ACTUAL_ACTION" };
    const expectedState: IStateUsers = {};
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle NEW_USER_OBJECT", () => {
    const initialState: IStateUsers = {};
    const users: IStateUsers = {};
    users[user.userIdentifier] = user;
    users[user1.userIdentifier] = user1;
    const action = { type: "NEW_USER_OBJECT", users };
    expect(userReducer(initialState, action)).toEqual(users);
  });

  test("Should handle UPDATE_USER", () => {
    const initialState: IStateUsers = {};
    initialState[user.userIdentifier] = user;
    const newUser: UserData = {
      ...user1,
      userIdentifier: user.userIdentifier
    };
    const action = {
      type: "UPDATE_USER",
      user: newUser
    };
    const expectedState: IStateUsers = {};
    expectedState[user.userIdentifier] = newUser;
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
