import { IStateOneNote } from "../reducers";
import { notebook, notebook1 } from "./notebooks";
import { page, page1 } from "./pages";
import { sectionGroup, sectionGroup1 } from "./sectionGroups";
import { section, section1 } from "./sections";

export const onenote: IStateOneNote = {};
onenote[notebook.id] = notebook;
onenote[notebook1.id] = notebook1;
onenote[sectionGroup.id] = sectionGroup;
onenote[sectionGroup1.id] = sectionGroup1;
onenote[section.id] = section;
onenote[section1.id] = section1;
onenote[page.id] = page;
onenote[page1.id] = page1;
