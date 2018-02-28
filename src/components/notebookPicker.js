import * as React from "react";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import "./notebookPicker.css";

export class NotebookPickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this._showModal = this._showModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this.state = {
      showModal: false,
      spinnerVisible: true
    };
  }

  componentWillReceiveProps() {
    this.setState({ spinnerVisible: false });
  }

  render() {
    return (
      <div>
        <DefaultButton
          description="Opens the Sample Modal"
          onClick={this._showModal}
          text="Open Modal"
        />
        <Modal
          isOpen={this.state.showModal}
          onDismiss={this._closeModal}
          isBlocking={false}
          containerClassName="ms-modalExample-container"
        >
          <div className="parent">
            {this.state.spinnerVisible && (
              <Spinner
                className="spinner"
                size={SpinnerSize.large}
                label="Hang on, I'm asking around for your notebooks..."
                ariaLive="assertive"
              />
            )}
          </div>
        </Modal>
      </div>
    );
  }

  _showModal() {
    this.setState({
      showModal: true,
      spinnerVisible: true
    });
    this.props.getAllNotebooks();
  }

  _closeModal() {
    this.setState({ showModal: false });
  }
}
