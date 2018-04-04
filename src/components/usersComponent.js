import * as React from "react";
import PropTypes from 'prop-types';
import { Facepile } from "office-ui-fabric-react/lib/Facepile";
import { Persona, PersonaSize } from "office-ui-fabric-react/lib/Persona";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { ActionButton } from "office-ui-fabric-react/lib/Button";
import "./usersComponent.css";

export default class UsersComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showUserPanel: false };
    this.showUserPanelClicked = this.showUserPanelClicked.bind(this);
    this.hideUserPanel = this.hideUserPanel.bind(this);
  }

  showUserPanelClicked() {
    this.setState({ showUserPanel: !this.state.showUserPanel });
  }

  hideUserPanel() {
    this.setState({ showUserPanel: false });
  }

  render() {
    let personas = [];
    this.props.users.forEach(user => {
      personas.push(
        <div
          className="PersonaContainer"
          key={user.personaName + "PanelContainer"}
        >
          <Persona
            imageInitials={user.imageInitials}
            initialsColor={user.initialsColor}
            imageUrl={user.imageUrl}
            primaryText={user.userName}
            secondaryText={user.personaName}
            size={PersonaSize.size40}
            key={user.personaName + "Panel"}
          />
        </div>
      );
    });

    let templates = [];
    if (this.props.numUsers > 0) {
      templates.push(
        <button
          key="usersButton"
          className={'facepileContainer' + (this.props.numUsers === 1 ? ' facepileContainerSingleUser' : '')}
          onClick={this.showUserPanelClicked}
        >
          <Facepile
            key="personaFacepile"
            personaSize={PersonaSize.size32}
            personas={this.props.users}
            showAddButton={false}
          />
        </button>
      );
    } else {
      templates.push(
        <div className="addbuttonContainer" key="addButtonContainer">
          <Facepile
            key="personaFacepile"
            personaSize={PersonaSize.size32}
            personas={this.props.users}
            showAddButton={true}
            addButtonProps={{ onClick: this.showUserPanelClicked }}
          />
        </div>
      );
    }
    return (
      <div>
        {templates}
        <Panel
          key="usersPanel"
          isOpen={this.state.showUserPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this.hideUserPanel}
          isLightDismiss={true}
          hasCloseButton={true}
          headerText="User accounts"
        >
          {personas}
          <ActionButton
            iconProps={{ iconName: "AddFriend" }}
            onClick={this.props.signIn}
          >
            Add an account
          </ActionButton>
          <ActionButton
            iconProps={{ iconName: "PeopleBlock" }}
            onClick={this.props.signOut}
            disabled={this.props.numUsers === 0 ? true : false}
          >
            Sign out of all accounts
          </ActionButton>
        </Panel>
      </div>
    );
  }
}

UsersComponent.propTypes = {
  users: PropTypes.array.isRequired,
  numUsers: PropTypes.number.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
}