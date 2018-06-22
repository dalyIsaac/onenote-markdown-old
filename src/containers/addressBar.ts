import { connect, Dispatch } from "react-redux";
import { IState, IStateOneNote } from "src/reducers";
import { selectedNav } from "../actions";
import { IUpdateSelected } from "../actions/selectedNav";
import AddressBar from "../components/addressBar";

export interface IPropsAddressBar {
  onenote: IStateOneNote[];
  selectedNav: string[];
  updateSelected(id: string): IUpdateSelected;
}

const mapStateToProps = (state: IState): Partial<IPropsAddressBar> => ({
  onenote: state.onenote,
  selectedNav: state.selectedNav
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<IPropsAddressBar> => ({
  updateSelected: (id: string) => dispatch(selectedNav.updateSelected(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBar);
