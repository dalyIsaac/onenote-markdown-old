import { connect } from "react-redux";
import NotebookNav from './../components/nav/notebookNav';
import { selectedNav, notebooks } from "../actions";

const mapStateToProps = state => ({
    notebooks: state.notebooks,
    notebookOrder: state.notebookOrder,
    selectedNav: state.selectedNav,
    totalNotebookLength: state.totalNotebookLength
});

const mapDispatchToProps = dispatch => ({
    updateSelectedNotebook: (newNotebook) => dispatch(selectedNav.updateSelectedNotebook([newNotebook])),
    closeNotebook: (notebookId) => dispatch(notebooks.closeNotebook(notebookId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookNav);
