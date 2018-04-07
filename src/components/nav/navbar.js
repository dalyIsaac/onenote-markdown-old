import * as React from 'react';
import PropTypes from 'prop-types';
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import NotebookPicker from "./notebookPicker";
// import NotebookNav from "../../containers/notebookNav";
import "./navbar.css";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      showModal: false
    };
  }

  /**
   * Prevents bugs with object references during render
   * @param {any} nextProps 
   */
  shouldComponentUpdate(nextProps) {
    const { openedNotebooks, notebookOrder } = nextProps;
    if (Object.keys(openedNotebooks).length !== notebookOrder.length) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="navbarParent">
        {/* <NotebookNav addNotebook={this.showModal} /> */}
        <DefaultButton onClick={this.showModal} >Add notebook</DefaultButton>
        <Modal
          isOpen={this.state.showModal}
          onDismiss={this.closeModal}
          isBlocking={false}
        >
          <div className="notebookPickerParent">
            {this.props.allNotebooks.length !== this.props.userLength ? (
              <Spinner
                className="notebookPickerSpinner"
                size={SpinnerSize.large}
                label="Hang on, I'm asking around for your notebooks..."
                ariaLive="assertive"
              />
            ) : (
                <NotebookPicker
                  openedNotebooks={this.props.openedNotebooks}
                  allNotebooks={this.props.allNotebooks}
                  openNotebooks={this.props.openNotebooks}
                  closeModal={this.closeModal} />
              )}
          </div>
        </Modal>
      </div>
    );
  }

  showModal() {
    this.setState({
      showModal: true
    });
    this.props.getAllNotebooks();
  }

  closeModal() {
    this.setState({ showModal: false });
  }
}

Navbar.propTypes = {
  allNotebooks: PropTypes.array.isRequired,
  userLength: PropTypes.number.isRequired,
  getAllNotebooks: PropTypes.func.isRequired,
  openedNotebooks: PropTypes.object.isRequired,
  notebookOrder: PropTypes.array.isRequired
};
