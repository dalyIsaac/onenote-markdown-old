import { connect, Dispatch } from "react-redux";
import { selectedNav } from "src/actions";
import { IUpdateSelected } from "src/actions/selectedNav";
import NotebookNav from "src/components/nav/notebookNav";
import { IState, IStateOneNote } from "src/reducers";

export interface IPropsNotebookNav {
  notebookOrder: string[];
  onenote: IStateOneNote[];
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
