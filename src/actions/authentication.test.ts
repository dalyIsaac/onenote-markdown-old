import { User } from "msal";
import { IUserDataObject, UserData } from "../types/UserData";
import {
  getAllUsers,
  getPhoto,
  INewUserObject,
  newUserObject,
  reauthorizeUser,
  signIn,
  signOut,
  updateUser
} from "./authentication";
import { IActionUser } from "./index";

describe("Actions: authentication", () => {
  //   test("Should create an action to start the authentication process with MSAL", () => {
  //     // incomplete
  // });

  test("Should create an action to start the signin process with MSAL", () => {
    const type = "SIGN_IN";
    const expectedAction = { type };
    expect(signIn()).toEqual(expectedAction);
  });

  test("Should create an action to start the signout process with MSAL", () => {
    const type = "SIGN_OUT";
    const expectedAction = { type };
    expect(signOut()).toEqual(expectedAction);
  });

  test("Should create an action to replace the user list with a new user object", () => {
    const type = "NEW_USER_OBJECT";
    const user1 = new UserData(
      new User(
        "john.smith@email.com",
        "John Smith",
        "identityProvider1",
        "genericstring1",
        {}
      ),
      "photoString1"
    );
    const user2 = new UserData(
      new User(
        "jane.doe@email.com",
        "Jane Doe",
        "identityProvider2",
        "genericstring2",
        {}
      ),
      "photoString2"
    );
    const users: IUserDataObject = {};
    users[user1.userIdentifier] = user1;
    users[user2.userIdentifier] = user2;
    const expectedAction: INewUserObject = { type, users };
    expect(newUserObject(users)).toEqual(expectedAction);
  });

  test("Should create an action to update a user", () => {
    const type = "UPDATE_USER";
    const user = new UserData(
      new User(
        "john.smith@email.com",
        "John Smith",
        "identityProvider1",
        "genericstring1",
        {}
      ),
      "photoString1"
    );
    const expectedAction: IActionUser = { type, user };
    expect(updateUser(user)).toEqual(expectedAction);
  });

  test("Should create an action to get the user's photo", () => {
    const type = "GET_PHOTO";
    const userId = "genericstring1";
    const expectedAction = { type, userId };
    expect(getPhoto(userId)).toEqual(expectedAction);
  });

  test("Should create an action to get a list of all the users who are currently logged in", () => {
    const type = "GET_ALL_USERS";
    const expectedAction = { type };
    expect(getAllUsers()).toEqual(expectedAction);
  });

  test("Should create an action to acquire a token for a user by redirecting the user", () => {
    const type = "REAUTHORIZE_USER";
    const user = new UserData(
      new User(
        "john.smith@email.com",
        "John Smith",
        "identityProvider1",
        "genericstring1",
        {}
      ),
      "photoString1"
    );
    const expectedAction = { type, user };
    expect(reauthorizeUser(user)).toEqual(expectedAction);
  });
});
