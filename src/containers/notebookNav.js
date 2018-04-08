import { connect } from "react-redux";
import NotebookNav from './../components/nav/notebookNav';
import { selectedNav, onenote } from "../actions";

const mapStateToProps = state => ({
    onenote: state.onenote,
    notebookOrder: state.notebookOrder,
    selectedNav: state.selectedNav,
    totalNotebookLength: state.totalNotebookLength
});

const mapDispatchToProps = dispatch => ({
    updateSelectedNotebook: (newNotebook) => dispatch(selectedNav.updateSelectedNotebook(newNotebook))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookNav);
