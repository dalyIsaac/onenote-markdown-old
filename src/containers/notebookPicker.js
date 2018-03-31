import NotebookPicker from "../components/notebookPicker";
import { connect } from "react-redux";
import { getNotebooks, notebooks } from "../actions";

const mapStateToProps = state => ({
  allNotebooks: state.allNotebooks,
  openedNotebooks: state.notebooks,
  userLength: state.users.length
});

const mapDispatchToProps = dispatch => ({
  getAllNotebooks: () => dispatch(getNotebooks.getAllNotebooks()),
  openNotebooks: (notebookList) => dispatch(notebooks.openNotebooks(notebookList))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookPicker);
