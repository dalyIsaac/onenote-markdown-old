import React from "react";
import PropTypes from 'prop-types';
import AddressBar from "../containers/addressBar";
import UsersContainer from "../containers/users";
import "./header.css";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react";
import {
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react/lib/Button";
import Image from './../onenote.svg';

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
          src={Image} />
        {Object.keys(this.props.users).length > 0 && (
          <div className="addressBarContainer">
            <AddressBar />
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
