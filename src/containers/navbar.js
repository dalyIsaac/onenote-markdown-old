import { connect } from "react-redux";
import Navbar from './../components/navbar';
import { getNotebooks, notebooks } from "../actions";

const mapStateToProps = state => ({
    allNotebooks: state.allNotebooks,
    openedNotebooks: state.notebooks,
    userLength: state.users.length,
    notebookOrder: state.notebookOrder
});
  
  const mapDispatchToProps = dispatch => ({
    getAllNotebooks: () => dispatch(getNotebooks.getAllNotebooks()),
    openNotebooks: (notebookList) => dispatch(notebooks.openNotebooks(notebookList))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
  