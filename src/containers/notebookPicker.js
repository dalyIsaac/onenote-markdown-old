import { NotebookPickerComponent } from '../components/notebookPicker';
import { connect } from 'react-redux';
import { getNotebooks } from '../actions';

const mapStateToProps = () => ({
    // nothing here yet
});

const mapDispatchToProps = (dispatch) => ({
    getAllNotebooks: () => dispatch(getNotebooks.getAllNotebooks())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookPickerComponent);
