import { connect, Dispatch } from "react-redux";
import { IState, IStateOneNote, IStateUserNotebooks } from "src/reducers";
import { getNotebooks, IAction, onenote } from "../actions";
import { IOpenNotebooks } from "../actions/onenote";
import { NotebookRow } from "../types/NotebookRow";
import Navbar from "./../components/nav/navbar";

export interface IPropsNavbar {
  allNotebooks: IStateUserNotebooks[];
  notebookOrder: string[];
  openedNotebooks: IStateOneNote[];
  userLength: number;
  getAllNotebooks(): IAction;
  openNotebooks(notebookList: NotebookRow[]): IOpenNotebooks;
}

const mapStateToProps = (state: IState): Partial<IPropsNavbar> => ({
  allNotebooks: state.allNotebooks,
  notebookOrder: state.notebookOrder,
  openedNotebooks: state.onenote,
  userLength: Object.keys(state.users).length
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<IPropsNavbar> => ({
  getAllNotebooks: () => dispatch(getNotebooks.getAllNotebooks()),
  openNotebooks: (notebookList: NotebookRow[]) =>
    dispatch(onenote.openNotebooks(notebookList))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
