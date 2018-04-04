import * as Msal from "msal";
import { appId, cacheLocation } from "../constants";
import {
  AUTHENTICATE,
  SIGN_IN,
  SIGN_OUT,
  GET_PHOTO,
  NEW_USER_OBJECT,
  UPDATE_USER,
  GET_ALL_USERS,
  REAUTHORIZE_USER
} from "../actionTypes";
import { app, updateApp } from "./index";
import { push } from "react-router-redux";
import { UserData } from "../types"; //eslint-disable-line

/**
 * Creates an action to start the authentication process with MSAL
 */
export function authenticate(dispatch) {
  const redirectUri = window.location.href.includes("localhost:3000")
    ? "http://localhost:3000"
    : "";
  updateApp(
    new Msal.UserAgentApplication(
      appId,
      "",
      () => {
        // callback
        dispatch(push("/"));
      },
      {
        cacheLocation,
        redirectUri,
        postLogoutRedirectUri: redirectUri
      }
    )
  );
  return {
    type: AUTHENTICATE,
    app
  };
}

/**
 * Creates an action to start the signin process with MSAL
 */
export const signIn = () => ({
  type: SIGN_IN,
  app
});

/**
 * Creates an action to start the signout process with MSAL
 */
export const signOut = () => ({
  type: SIGN_OUT,
  app
});

/**
 * Creates an action to replace the user list with a new user list
 * @param {Object} users
 */
export const newUserObject = (users) => ({
  type: NEW_USER_OBJECT,
  users
});

/**
 * Creates an action to update a user
 * @param {UserData} user
 */
export const updateUser = user => ({
  type: UPDATE_USER,
  user
});

/**
 * Creates an action to get the user's photo
 * @param {UserData} user
 */
export const getPhoto = user => ({
  type: GET_PHOTO,
  app,
  user
});

/**
 * Creates an action to get a list of all of the users who are currently logged in
 */
export const getAllUsers = () => ({
  type: GET_ALL_USERS,
  app
});

/**
 * Acquires a token by redirecting a user who is logged in, but the token has expired
 * @param {UserData} user
 */
export const reauthorizeUser = (user) => ({
  type: REAUTHORIZE_USER,
  app,
  user
});
