import { connect } from "react-redux";
import AddressBar from "../components/addressBar";

const mapStateToProps = state => ({
  onenote: state.onenote,
  selectedNav: state.selectedNav
});

export default connect(mapStateToProps)(AddressBar);
