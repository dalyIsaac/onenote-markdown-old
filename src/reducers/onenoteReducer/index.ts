import { IStateOneNote } from "src/reducers";
import { IAction } from "../../actions";
import {
  IGetPageContentError,
  ILoadOneNote,
  ISaveNotebook,
  ISavePage,
  ISavePageContent,
  ISaveSection,
  ISaveSectionGroup,
  IUpdateIsExpanded
} from "../../actions/onenote";
import {
  GET_PAGE_CONTENT_ERROR,
  LOAD_ONENOTE,
  SAVE_NOTEBOOK,
  SAVE_PAGE,
  SAVE_PAGE_CONTENT,
  SAVE_SECTION,
  SAVE_SECTION_GROUP,
  UPDATE_IS_EXPANDED
} from "../../actionTypes";
import { SectionGroup } from "../../types/SectionGroup";

export default function onenoteReducer(
  state: IStateOneNote = {},
  action: IAction
) {
  const data: IStateOneNote = { ...state };
  let sectionGroup: SectionGroup;
  switch (action.type) {
    case SAVE_NOTEBOOK:
      const notebook = { ...(action as ISaveNotebook).notebook };
      notebook.sections = [...(action as ISaveNotebook).notebook.sections];
      notebook.sectionGroups = [
        ...(action as ISaveNotebook).notebook.sectionGroups
      ];
      data[notebook.id] = notebook;
      return data;
    case SAVE_SECTION_GROUP:
      sectionGroup = { ...(action as ISaveSectionGroup).sectionGroup };
      sectionGroup.sections = [
        ...(action as ISaveSectionGroup).sectionGroup.sections
      ];
      sectionGroup.sectionGroups = [
        ...(action as ISaveSectionGroup).sectionGroup.sectionGroups
      ];
      if (state[sectionGroup.id] !== undefined) {
        sectionGroup.isExpanded = (state[
          sectionGroup.id
        ] as SectionGroup).isExpanded;
      }
      data[sectionGroup.id] = sectionGroup;
      return data;
    case SAVE_SECTION:
      const section = { ...(action as ISaveSection).section };
      section.pages = [...(action as ISaveSection).section.pages];
      data[section.id] = section;
      return data;
    case SAVE_PAGE:
      const page = { ...(action as ISavePage).page };
      data[page.id] = page;
      return data;
    case LOAD_ONENOTE:
      return (action as ILoadOneNote).onenote;
    case UPDATE_IS_EXPANDED:
      const { id, isExpanded } = action as IUpdateIsExpanded;
      sectionGroup = { ...state[id] } as SectionGroup;
      sectionGroup.isExpanded = isExpanded;
      data[id] = sectionGroup;
      return data;
    case SAVE_PAGE_CONTENT: {
      const { pageId, content } = action as ISavePageContent;
      const newPage = { ...state[pageId], content };
      data[pageId] = newPage;
      return { ...data };
    }
    case GET_PAGE_CONTENT_ERROR: {
      const { pageId, error } = action as IGetPageContentError;
      data[pageId] = { ...state[pageId], error };
      return { ...data };
    }
    default:
      return state;
  }
}
