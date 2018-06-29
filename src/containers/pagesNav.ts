import { connect, Dispatch } from "react-redux";
import { IUpdateIsExpanded } from "src/actions/onenote";
import { IUpdateSelected } from "src/actions/selectedNav";
import { IState, IStateOneNote } from "src/reducers";
import { onenote, selectedNav } from "../actions";
import PagesNav from "../components/nav/pagesNav";

export interface IPropsPagesNav {
  onenote: IStateOneNote[];
  selectedNav: string[];
  updateIsExpanded(id: string, isExpanded: boolean): IUpdateIsExpanded;
  updateSelected(id: string): IUpdateSelected;
}

const mapStateToProps = (state: IState): Partial<IPropsPagesNav> => ({
  onenote: state.onenote,
  selectedNav: state.selectedNav
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<IPropsPagesNav> => ({
  updateIsExpanded: (id: string, isExpanded: boolean) =>
    dispatch(onenote.updateIsExpanded(id, isExpanded)),
  updateSelected: (id: string) => dispatch(selectedNav.updateSelected(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PagesNav);
