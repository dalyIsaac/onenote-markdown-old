import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export class NotebookPickerComponent extends React.Component {

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
          description='Opens the Sample Modal'
          onClick={ this._showModal }
          text='Open Modal'
        />
        <Modal
          isOpen={ this.state.showModal }
          onDismiss={ this._closeModal }
          isBlocking={ false }
          containerClassName='ms-modalExample-container'
        >
          <h1>Hello, world!</h1>
        </Modal>
      </div>
    );
  }

  _showModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }
}
