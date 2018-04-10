import React from "react";
import PropTypes from 'prop-types';
import { AddressBarComponent } from "./addressBar";
import UsersContainer from "../containers/users";
import "./header.css";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react";
import {
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react/lib/Button";

export default class Header extends React.Component {
  componentWillMount() {
    this.props.authenticate();
  }

  render() {
    return (
      <div className="container">
        <img
          className="onenoteIcon"
          alt="OneNote logo"
          src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/onenote_16x1.svg" />
        {Object.keys(this.props.users).length > 0 && (
          <div className="addressBarContainer">
            <AddressBarComponent />
          </div>
        )}
        <div className="usersContainer">
          <UsersContainer />
        </div>
        <Dialog
          hidden={this.props.userWithError === undefined}
          dialogContentProps={{
            type: DialogType.normal,
            title: "There was a slight problem..."
          }}
          modalProps={{
            titleAriaId: "myLabelId",
            subtitleAriaId: "mySubTextId",
            isBlocking: true
          }}
        >
          <p>
            <span className="boldText">
              {this.props.userWithError === undefined
                ? ""
                : this.props.userWithError.displayableId + " "}
            </span>
            requires you to reauthorize OneNoteMarkdown.{" "}
            <span className="boldText">
              Signing out signs you out of all accounts.
            </span>
          </p>
          <DialogFooter>
            <PrimaryButton
              onClick={() =>
                this.props.reauthorizeUser(this.props.userWithError)
              }
              text="Reauthorize"
            />
            <DefaultButton onClick={this.props.signOut} text="Sign out" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

Header.propTypes = {
  authenticate: PropTypes.func.isRequired,
  reauthorizeUser: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  userWithError: PropTypes.object
};
