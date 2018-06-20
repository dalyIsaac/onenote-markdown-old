import { Page } from "csstype";
import {
  IGetPageContent,
  IGetPageContentError,
  ILoadOneNote,
  ISaveNotebook,
  ISavePage,
  ISavePageContent,
  ISaveSection,
  ISaveSectionGroup,
  IUpdateIsExpanded
} from "../actions/onenote";
import {
  GET_PAGE_CONTENT_ERROR,
  LOAD_ONENOTE,
  SAVE_NOTEBOOK,
  SAVE_PAGE,
  SAVE_PAGE_CONTENT,
  SAVE_SECTION,
  SAVE_SECTION_GROUP,
  UPDATE_IS_EXPANDED
} from "../actionTypes";
import { Notebook } from "../types/Notebook";
import { Section } from "../types/Section";
import { SectionGroup } from "../types/SectionGroup";

type actionType = ISaveNotebook &
  ISaveSectionGroup &
  ISaveSection &
  ISavePage &
  ISavePageContent &
  ILoadOneNote &
  IGetPageContentError &
  IGetPageContent &
  IUpdateIsExpanded;

interface IStateObject {
  [key: string]: Notebook | SectionGroup | Section | Page;
}

export default function onenote(state: IStateObject = {}, action: actionType) {
  const data: IStateObject = { ...state };
  let sectionGroup: SectionGroup;
  let page: any;
  switch (action.type) {
    case SAVE_NOTEBOOK:
      const notebook = { ...action.notebook };
      notebook.sections = [...action.notebook.sections];
      notebook.sectionGroups = [...action.notebook.sectionGroups];
      data[notebook.id] = notebook;
      return data;
    case SAVE_SECTION_GROUP:
      sectionGroup = { ...action.sectionGroup };
      sectionGroup.sections = [...action.sectionGroup.sections];
      sectionGroup.sectionGroups = [...action.sectionGroup.sectionGroups];
      if (state[sectionGroup.id] !== undefined) {
        sectionGroup.isExpanded = (state[
          sectionGroup.id
        ] as SectionGroup).isExpanded;
      }
      data[sectionGroup.id] = sectionGroup;
      return data;
    case SAVE_SECTION:
      const section = { ...action.section };
      section.pages = [...action.section.pages];
      data[section.id] = section;
      return data;
    case SAVE_PAGE:
      page = { ...action.page };
      data[page.id] = page;
      return data;
    case LOAD_ONENOTE:
      return action.onenote;
    case UPDATE_IS_EXPANDED:
      const { id, isExpanded } = action;
      sectionGroup = { ...state[id] } as SectionGroup;
      sectionGroup.isExpanded = isExpanded;
      data[id] = sectionGroup;
      return data;
    case SAVE_PAGE_CONTENT: {
      const { pageId, content } = action;
      const newPage = { ...state[pageId], content };
      data[pageId] = newPage;
      return { ...data };
    }
    case GET_PAGE_CONTENT_ERROR: {
      const { pageId, error } = action;
      page = { ...state[pageId], error };
      data[pageId] = page;
      return { ...data };
    }
    default:
      return state;
  }
}
