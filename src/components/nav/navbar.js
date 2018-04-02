import * as React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import NotebookPicker from "./notebookPicker";
import NotebookNav from "../../containers/notebookNav";
import "./navbar.css";

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
    let notebookList = this.props.notebookOrder.map(id => {
      const notebook = this.props.openedNotebooks[id];
      return ({
        name: notebook.displayName,
        url: '',
        icon: 'OneNoteLogo',
        key: notebook.id,
        openContextMenu: false
      });
    });

    return (
      <div>
        <Nav
          groups={[{
            links:
              [
                ...notebookList,
                {
                  name: 'Open notebooks',
                  url: '',
                  onClick: this.showModal,
                  icon: 'Add',
                  key: 'openNotebooks'
                },
              ]
          }]}
          expandedStateText={'expanded'}
          collapsedStateText={'collapsed'}
        />
        <NotebookNav
          notebookOrder={this.props.notebookOrder}
          notebooks={this.props.openedNotebooks} />
        <Modal
          isOpen={this.state.showModal}
          onDismiss={this.closeModal}
          isBlocking={false}
        >
          <div className="parent">
            {this.props.allNotebooks.length !== this.props.userLength ? (
              <Spinner
                className="spinner"
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
