import NotebookPicker from "../components/notebookPicker";
import { connect } from "react-redux";
import { getNotebooks, notebooks } from "../actions";

const mapStateToProps = state => ({
  notebooks: state.allNotebooks,
  userLength: state.users.length
});

const mapDispatchToProps = dispatch => ({
  getAllNotebooks: () => dispatch(getNotebooks.getAllNotebooks()),
  setItem: () => dispatch(notebooks.setItem()),
  getItem: () => dispatch(notebooks.getItem())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookPicker);
