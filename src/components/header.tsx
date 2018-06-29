import { Dialog, DialogFooter, DialogType } from "office-ui-fabric-react";
import {
  DefaultButton,
  PrimaryButton
} from "office-ui-fabric-react/lib/Button";
import * as React from "react";
import { UserData } from "src/types/UserData";
import AddressBar from "../containers/addressBar";
import { IPropsHeader } from "../containers/header";
import UsersContainer from "../containers/users";
import Image from "./../onenote.svg";
import "./header.css";

export default class Header extends React.Component<IPropsHeader> {
  public componentWillMount() {
    this.props.authenticate();
  }

  public render() {
    return (
      <div className="container">
        <img className="onenoteIcon" alt="OneNote logo" src={Image} />
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
            title: "There was a slight problem...",
            type: DialogType.normal
          }}
          modalProps={{
            isBlocking: true,
            subtitleAriaId: "mySubTextId",
            titleAriaId: "myLabelId"
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
              // tslint:disable-next-line:jsx-no-lambda
              onClick={() =>
                this.props.reauthorizeUser(this.props.userWithError as UserData)
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
