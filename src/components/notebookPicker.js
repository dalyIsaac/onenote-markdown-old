import * as React from "react";
import PropTypes from 'prop-types';
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { NotebookPickerList } from "./notebookPickerList";
import "./notebookPicker.css";

export default class NotebookPicker extends React.Component {
  constructor(props) {
    super(props);
    this._showModal = this._showModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this.state = {
      showModal: false
    };
  }

  render() {
    return (
      <div>
        <DefaultButton
          description="Opens the notebook picker"
          onClick={this._showModal}
          text="Open Notebooks"
        />
        <Modal
          isOpen={this.state.showModal}
          onDismiss={this._closeModal}
          isBlocking={false}
        >
          <div className="parent">
            {this.props.notebooks.length !== this.props.userLength ? (
              <Spinner
                className="spinner"
                size={SpinnerSize.large}
                label="Hang on, I'm asking around for your notebooks..."
                ariaLive="assertive"
              />
            ) : (
              <NotebookPickerList notebooks={this.props.notebooks} />
            )}
          </div>
        </Modal>
        <DefaultButton
          onClick={this.props.setItem}
          text="Set item"
        />
        <DefaultButton
          onClick={this.props.getItem}
          text="Get item"
        />
      </div>
    );
  }

  _showModal() {
    this.setState({
      showModal: true
    });
    this.props.getAllNotebooks();
  }

  _closeModal() {
    this.setState({ showModal: false });
  }
}

NotebookPicker.propTypes = {
  notebooks: PropTypes.array.isRequired,
  userLength: PropTypes.number.isRequired,
  getAllNotebooks: PropTypes.func.isRequired
};