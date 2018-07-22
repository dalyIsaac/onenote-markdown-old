import { IStateUserNotebooks } from "../reducers";
import {
  graphNotebookInstance,
  graphNotebookInstance1,
  graphNotebookInstance2
} from "./graphNotebookInstances";
import { userId, userId1 } from "./users";

export const allNotebooks: IStateUserNotebooks[] = [
  {
    displayableId: "genericstring",
    notebooks: [graphNotebookInstance, graphNotebookInstance2],
    userId
  },
  {
    displayableId: "genericstring1",
    notebooks: [graphNotebookInstance1],
    userId: userId1
  }
];
