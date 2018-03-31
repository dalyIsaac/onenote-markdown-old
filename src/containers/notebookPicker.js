import NotebookPicker from "../components/notebookPicker";
import { connect } from "react-redux";
import { getNotebooks, notebooks } from "../actions";

const mapStateToProps = state => ({
  notebooks: state.allNotebooks,
  userLength: state.users.length
});

const mapDispatchToProps = dispatch => ({
  getAllNotebooks: () => dispatch(getNotebooks.getAllNotebooks()),
  openNotebooks: (notebookList) => dispatch(notebooks.openNotebooks(notebookList))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookPicker);
