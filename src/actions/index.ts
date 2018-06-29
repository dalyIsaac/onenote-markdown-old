import { UserData } from "src/types/UserData";
import * as authentication from "./authentication";
import * as getNotebooks from "./getNotebooks";
import * as notebookOrder from "./notebookOrder";
import * as onenote from "./onenote";
import * as selectedNav from "./selectedNav";
import * as totalNotebookLength from "./totalNotebookLength";

export interface IAction {
  type: string;
}

export interface IActionUser {
  type: string;
  user: UserData;
}

export { onenote };
export { authentication };
export { getNotebooks };
export { selectedNav };
export { totalNotebookLength };
export { notebookOrder };
