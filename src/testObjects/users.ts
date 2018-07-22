import { User } from "msal";
import { UserData } from "../types/UserData";

export const userId = "jane.doe@email.com";
export const userId1 = "john.smith@email.com";

export const user = new UserData(
  new User(
    "john.smith@email.com",
    "John Smith",
    "identityProvider1",
    "genericstring1",
    {}
  ),
  "photoString1"
);

export const user1 = new UserData(
  new User(
    "jane.doe@email.com",
    "Jane Doe",
    "identityProvider2",
    "genericstring2",
    {}
  ),
  "photoString2"
);
