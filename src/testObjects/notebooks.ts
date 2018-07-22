import { Notebook } from "../types/Notebook";
import {
  graphNotebookInstance,
  graphNotebookInstance1,
  graphNotebookInstance2
} from "./graphNotebookInstances";
import { userId, userId1 } from "./users";

export const notebook = new Notebook(
  graphNotebookInstance,
  userId,
  "genericstring"
);
export const notebook1 = new Notebook(
  graphNotebookInstance1,
  userId1,
  "genericstring1"
);
export const notebook2 = new Notebook(
  graphNotebookInstance2,
  userId,
  "genericstring"
);
