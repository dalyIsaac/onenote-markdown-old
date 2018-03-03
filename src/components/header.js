import * as React from "react";
import { Image, ImageFit } from "office-ui-fabric-react/lib/Image";
import { AddressBarComponent } from "./addressBar";
import UsersContainer from "../containers/users";
import "./header.css";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react";
import {
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react/lib/Button";

export class HeaderComponent extends React.Component {
  render() {
    return (
      <div className="container">
        <Image
          className="icon"
          src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/onenote_96x1.png"
          imageFit={ImageFit.contain}
          width={48}
          height={48}
        />
        {this.props.users.length > 0 && (
          <div className="addressBarContainer">
            <AddressBarComponent />
          </div>
        )}
        <div className="usersContainer">
          <UsersContainer />
        </div>
        <Dialog
          hidden={this.props.userWithError === undefined}
          //   onDismiss={ this._closeDialog }
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
            <span className="accountName">
              {this.props.userWithError === undefined
                ? ""
                : this.props.userWithError.msal.displayableId + " "}
            </span>
            requires you to reauthorize OneNoteMarkdown
          </p>
          <DialogFooter>
            <PrimaryButton
              // onClick={this._closeDialog}
              text="Reauthorize"
            />
            <DefaultButton
              // onClick={this._closeDialog}
              text="Sign out"
            />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
