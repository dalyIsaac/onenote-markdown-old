import { User } from "msal";

/**
 * Custom class which extends MSAL's User class.
 * This class is not deflated in order to reduce boilerplate.
 * @export
 * @class UserData
 */
export class UserData {
  public displayableId?: string;
  public photo: string;
  public acquireTokenError = null;
  public userIdentifier: string;
  public name: string;

  constructor(msal: User, photo = "", acquireTokenError = null) {
    this.displayableId = undefined;
    Object.assign(this, msal);
    this.photo = photo;
    this.acquireTokenError = acquireTokenError;
  }
}

export interface IUserDataObject {
  [key: string]: UserData;
}
