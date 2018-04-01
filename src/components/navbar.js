import * as React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import NotebookPicker from "./notebookPicker";
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

  render() {
    return (
      <div className='ms-NavExample-LeftPane'>
        <Nav
          groups={
            [
              {
                links:
                  [
                    { name: 'Documents', url: '', key: 'key3' },
                    { name: 'Pages', url: '', key: 'key4' },
                    { name: 'Notebook', url: '', key: 'key5' },
                    { name: 'Long Name Test for ellipse', url: '', key: 'key6' },
                    {
                      name: 'Edit',
                      url: '',
                      onClick: this._onClickHandler2,
                      icon: 'Edit',
                      key: 'key8'
                    },
                    {
                      name: 'Delete',
                      url: '',
                      onClick: this._onClickHandler2,
                      iconProps: { iconName: 'OneNoteLogo' },
                      key: 'key9'
                    },
                    {
                      name: 'Open notebooks',
                      url: '',
                      onClick: this.showModal,
                      iconProps: { iconName: 'Add' },
                      key: 'openNotebooks'
                    },
                  ]
              }
            ]
          }
          expandedStateText={'expanded'}
          collapsedStateText={'collapsed'}
          selectedKey={'key3'}
        />
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
                  openNotebooks={this.props.openNotebooks} />
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
  getAllNotebooks: PropTypes.func.isRequired
};
