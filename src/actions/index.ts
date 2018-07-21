import { UserData } from "src/types/UserData";
import * as allNotebooks from "./allNotebooks";
import * as authentication from "./authentication";
import * as notebookOrder from "./notebookOrder";
import * as onenote from "./onenote";
import * as selectedNav from "./selectedNav";
import * as totalNotebookLength from "./totalNotebookLength";

export interface IAction {
  type: string;
}

export interface IActionUser extends IAction {
  user: UserData;
}

export { allNotebooks };
export { authentication };
export { notebookOrder };
export { onenote };
export { selectedNav };
export { totalNotebookLength };
