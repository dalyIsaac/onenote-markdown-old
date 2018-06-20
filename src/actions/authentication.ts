import { Dispatch } from "redux";
import { IAction, IActionUser } from "src/actions";
import { UserData } from "src/types/UserData";
import {
  AUTHENTICATE,
  GET_ALL_USERS,
  GET_PHOTO,
  NEW_USER_OBJECT,
  REAUTHORIZE_USER,
  SIGN_IN,
  SIGN_OUT,
  UPDATE_USER
} from "../actionTypes";

export interface IAuthenticate {
  dispatch: Dispatch;
  type: string;
}

/**
 * Creates an action to start the authentication process with MSAL
 */
export const authenticate = (dispatch: Dispatch): IAuthenticate => ({
  dispatch,
  type: AUTHENTICATE
});

/**
 * Creates an action to start the signin process with MSAL
 */
export const signIn = (): IAction => ({
  type: SIGN_IN
});

/**
 * Creates an action to start the signout process with MSAL
 */
export const signOut = (): IAction => ({
  type: SIGN_OUT
});

export interface INewUserObject {
  type: string;
  users: UserData[];
}

/**
 * Creates an action to replace the user list with a new user list
 */
export const newUserObject = (users: UserData[]): INewUserObject => ({
  type: NEW_USER_OBJECT,
  users
});

/**
 * Creates an action to update a user
 */
export const updateUser = (user: UserData): IActionUser => ({
  type: UPDATE_USER,
  user
});

export interface IGetPhoto {
  type: string;
  userId: string;
}

/**
 * Creates an action to get the user's photo
 */
export const getPhoto = (userId: string): IGetPhoto => ({
  type: GET_PHOTO,
  userId
});

/**
 * Creates an action to get a list of all of the users who are currently logged in
 */
export const getAllUsers = (): IAction => ({
  type: GET_ALL_USERS
});

/**
 * Acquires a token by redirecting a user who is logged in, but the token has expired
 */
export const reauthorizeUser = (user: UserData): IActionUser => ({
  type: REAUTHORIZE_USER,
  user
});
