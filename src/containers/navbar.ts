import { connect, Dispatch } from "react-redux";
import { allNotebooks, IAction, onenote } from "../actions";
import { IOpenNotebooks } from "../actions/onenote";
import Navbar from "../components/nav/navbar";
import { IState, IStateOneNote, IStateUserNotebooks } from "../reducers";
import { Notebook } from "../types/Notebook";

export interface IPropsNavbar {
  allNotebooks: IStateUserNotebooks[];
  notebookOrder: string[];
  openedNotebooks: IStateOneNote;
  userLength: number;
  getAllNotebooks(): IAction;
  openNotebooks(notebookList: Notebook[]): IOpenNotebooks;
}

const mapStateToProps = (state: IState): Partial<IPropsNavbar> => ({
  allNotebooks: state.allNotebooks,
  notebookOrder: state.notebookOrder,
  openedNotebooks: state.onenote,
  userLength: Object.keys(state.users).length
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<IPropsNavbar> => ({
  getAllNotebooks: () => dispatch(allNotebooks.getAllNotebooks()),
  openNotebooks: (notebookList: Notebook[]) =>
    dispatch(onenote.openNotebooks(notebookList))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
