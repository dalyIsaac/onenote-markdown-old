import { connect } from "react-redux";
import Navbar from './../components/nav/navbar';
import { getNotebooks, onenote } from "../actions";

const mapStateToProps = state => ({
    allNotebooks: state.allNotebooks,
    openedNotebooks: state.onenote,
    userLength: Object.keys(state.users).length,
    notebookOrder: state.notebookOrder
});

const mapDispatchToProps = dispatch => ({
    getAllNotebooks: () => dispatch(getNotebooks.getAllNotebooks()),
    openNotebooks: (notebookList) => dispatch(onenote.openNotebooks(notebookList))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
