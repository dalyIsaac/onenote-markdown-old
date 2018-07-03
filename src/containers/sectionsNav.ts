import { connect, Dispatch } from "react-redux";
import { IState, IStateOneNote } from "src/reducers";
import { onenote, selectedNav } from "../actions";
import { IUpdateIsExpanded } from "../actions/onenote";
import { IUpdateSelected } from "../actions/selectedNav";
import SectionsNav from "./../components/nav/sectionsNav";

export interface IPropsSectionNav extends React.HTMLAttributes<HTMLDivElement> {
  onenote: IStateOneNote;
  selectedNav: string[];
  updateSelected(id: string): IUpdateSelected;
  updateIsExpanded(id: string, isExpanded: boolean): IUpdateIsExpanded;
}

const mapStateToProps = (state: IState): Partial<IPropsSectionNav> => ({
  onenote: state.onenote,
  selectedNav: state.selectedNav
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<IPropsSectionNav> => ({
  updateIsExpanded: (id: string, isExpanded: boolean) =>
    dispatch(onenote.updateIsExpanded(id, isExpanded)),
  updateSelected: (id: string) => dispatch(selectedNav.updateSelected(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionsNav);
