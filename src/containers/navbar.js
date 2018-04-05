import { connect } from "react-redux";
import Navbar from './../components/nav/navbar';
import { getNotebooks } from "../actions";

const mapStateToProps = state => ({
    allNotebooks: state.allNotebooks,
    openedNotebooks: state.notebooks,
    userLength: Object.keys(state.users).length,
    notebookOrder: state.notebookOrder
});

const mapDispatchToProps = dispatch => ({
    getAllNotebooks: () => dispatch(getNotebooks.getAllNotebooks()),
    // openNotebooks: (notebookList) => dispatch(notebooks.openNotebooks(notebookList))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
