import { connect } from "react-redux";
import { selectedNav } from "../actions";
import AddressBar from "../components/addressBar";

const mapStateToProps = state => ({
  onenote: state.onenote,
  selectedNav: state.selectedNav
});

const mapDispatchToProps = dispatch => ({
  updateSelected: (id) => dispatch(selectedNav.updateSelected(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressBar);
