import { connect, Dispatch } from "react-redux";
import { selectedNav } from "../actions";
import { IUpdateSelected } from "../actions/selectedNav";
import NotebookNav from "../components/nav/notebookNav";
import { IState, IStateOneNote } from "../reducers";

export interface IPropsNotebookNav {
  notebookOrder: string[];
  onenote: IStateOneNote;
  selectedNav: string[];
  totalNotebookLength: number;
  updateSelected(newNotebook: string): IUpdateSelected;
}

const mapStateToProps = (state: IState): Partial<IPropsNotebookNav> => ({
  notebookOrder: state.notebookOrder,
  onenote: state.onenote,
  selectedNav: state.selectedNav,
  totalNotebookLength: state.totalNotebookLength
});

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<IPropsNotebookNav> => ({
  updateSelected: (newNotebook: string) =>
    dispatch(selectedNav.updateSelected(newNotebook))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotebookNav);
