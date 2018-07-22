import { IStateOneNote } from "../reducers";
import { notebook } from "./notebooks";

export const openedNotebooks: IStateOneNote = {};
openedNotebooks[notebook.id] = notebook;
