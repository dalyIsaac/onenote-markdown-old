import { NotebookPickerComponent } from "../components/notebookPicker";
import { connect } from "react-redux";
import { getNotebooks } from "../actions";

const mapStateToProps = state => ({
  notebooks: state.allNotebooks,
  userLength: state.users.length
});

const mapDispatchToProps = dispatch => ({
  getAllNotebooks: () => dispatch(getNotebooks.getAllNotebooks())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  NotebookPickerComponent
);
