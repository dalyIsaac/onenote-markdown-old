import { connect } from "react-redux";
import { selectedNav, onenote } from "../actions";
import PagesNav from "../components/nav/pagesNav";

const mapStateToProps = state => ({
    onenote: state.onenote,
    selectedNav: state.selectedNav
});

const mapDispatchToProps = dispatch => ({
    updateSelected: (id) => dispatch(selectedNav.updateSelected(id)),
    updateIsExpanded: (id, isExpanded) => dispatch(onenote.updateIsExpanded(id, isExpanded))
});

export default connect(mapStateToProps, mapDispatchToProps)(PagesNav);