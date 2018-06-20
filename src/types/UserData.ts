import { UserAgentApplication } from "msal";

/**
 * Custom class which extends MSAL's User class.  
 * This class is not deflated in order to reduce boilerplate. 
 * @export
 * @class UserData
 */
export class UserData {
    public displayableId: string | undefined;
    public photo: string;
    public acquireTokenError = null;

    constructor(msal: UserAgentApplication, photo = "", acquireTokenError = null) {
        this.displayableId = undefined;
        Object.assign(this, msal);
        this.photo = photo;
        this.acquireTokenError = acquireTokenError;
    }
}
