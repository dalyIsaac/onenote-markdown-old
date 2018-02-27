import { NotebookPickerComponent } from '../components/notebookPicker';
import { connect } from 'react-redux';
import { notebooks } from '../actions';

const mapStateToProps = () => ({
    // nothing here yet
});

const mapDispatchToProps = (dispatch) => ({
    getAllNotebooks: () => dispatch(notebooks.getAllNotebooks())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookPickerComponent);
