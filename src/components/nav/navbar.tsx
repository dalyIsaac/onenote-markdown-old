import { Spinner, SpinnerSize } from "office-ui-fabric-react";
import { Modal } from "office-ui-fabric-react/lib-commonjs/Modal";
import * as React from "react";
import { IPropsNavbar } from "../../containers/navbar";
import NotebookNav from "../../containers/notebookNav";
import PagesNav from "../../containers/pagesNav";
import SectionsNav from "../../containers/sectionsNav";
import "./navbar.css";
import NotebookPicker from "./notebookPicker";

interface IStateNavbar {
  showModal: boolean;
}

export default class Navbar extends React.Component<
  IPropsNavbar,
  IStateNavbar
> {
  constructor(props: IPropsNavbar) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      showModal: false
    };
  }

  // /**
  //  * Prevents bugs with object references during render
  //  * @param {any} nextProps
  //  */
  // shouldComponentUpdate(nextProps) {
  //   const { openedNotebooks, notebookOrder } = nextProps;
  //   if (Object.keys(openedNotebooks).length !== notebookOrder.length) {
  //     return false;
  //   }
  //   return true;
  // }

  public render() {
    return (
      <div className="navbarParent">
        <NotebookNav addNotebook={this.showModal} />
        <SectionsNav />
        <PagesNav />
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
                closeModal={this.closeModal}
              />
            )}
          </div>
        </Modal>
      </div>
    );
  }

  public showModal(ev: React.MouseEvent<Element>): React.MouseEvent<Element> {
    this.setState({
      showModal: true
    });
    this.props.getAllNotebooks();
    return ev;
  }

  public closeModal() {
    this.setState({ showModal: false });
  }
}
