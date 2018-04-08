import { connect } from "react-redux";
import SectionsNav from './../components/nav/sectionsNav';
import { selectedNav } from "../actions";

const mapStateToProps = state => ({
    onenote: state.onenote,
    selectedNav: state.selectedNav
});

const mapDispatchToProps = dispatch => ({
    updateSelected: (id) => dispatch(selectedNav.updateSelected(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionsNav);