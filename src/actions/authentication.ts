import { Dispatch } from "redux";
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

  /**
   * Creates an action to start the authentication process with MSAL
   */
  export const authenticate = (dispatch: Dispatch) => ({
    dispatch,
    type: AUTHENTICATE
  });
  
  /**
   * Creates an action to start the signin process with MSAL
   */
  export const signIn = () => ({
    type: SIGN_IN
  });
  
  /**
   * Creates an action to start the signout process with MSAL
   */
  export const signOut = () => ({
    type: SIGN_OUT
  });
  
  /**
   * Creates an action to replace the user list with a new user list
   */
  export const newUserObject = (users: UserData[]) => ({
    type: NEW_USER_OBJECT,
    users
  });
  
  /**
   * Creates an action to update a user
   */
  export const updateUser = (user: UserData) => ({
    type: UPDATE_USER,
    user
  });
  
  /**
   * Creates an action to get the user's photo
   */
  export const getPhoto = (userId: string) => ({
    type: GET_PHOTO,
    userId
  });
  
  /**
   * Creates an action to get a list of all of the users who are currently logged in
   */
  export const getAllUsers = () => ({
    type: GET_ALL_USERS
  });
  
  /**
   * Acquires a token by redirecting a user who is logged in, but the token has expired
   */
  export const reauthorizeUser = (user: UserData) => ({
    type: REAUTHORIZE_USER,
    user
  });
  