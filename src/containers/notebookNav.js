import { connect } from "react-redux";
import NotebookNav from './../components/nav/notebookNav';
import { selectedNav } from "../actions";

const mapStateToProps = state => ({
    onenote: state.onenote,
    notebookOrder: state.notebookOrder,
    selectedNav: state.selectedNav,
    totalNotebookLength: state.totalNotebookLength
});

const mapDispatchToProps = dispatch => ({
    updateSelected: (newNotebook) => dispatch(selectedNav.updateSelected(newNotebook))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookNav);
