import { PersonaInitialsColor } from "office-ui-fabric-react/lib-commonjs/Persona";
import * as React from "react";
import { IPropsUsers } from "../containers/users";
import UsersComponent from "./usersComponent";

export interface IPersona {
  imageInitials: string;
  imageUrl: string;
  personaName?: string;
  userName: string;
  initialsColor: PersonaInitialsColor;
}

export default class UsersContainer extends React.Component<IPropsUsers> {
  public componentWillMount() {
    if (Object.keys(this.props.users).length === 0) {
      this.props.redirectToAbout();
    }
  }

  public render() {
    const personas: IPersona[] = [];
    for (const userId in this.props.users) {
      if (this.props.users.hasOwnProperty(userId)) {
        const user = this.props.users[userId];
        const persona: IPersona = {
          imageInitials: user.name
            .split(" ")
            .reduce((acc: string, val: string) => acc + val[0], ""),
          imageUrl: user.photo,
          initialsColor:
            PersonaInitialsColor[PersonaInitialsColor[personas.length % 15]], // NOTE: Hard-coded value
          personaName: user.displayableId,
          userName: user.name
        };
        personas.push(persona);
      }
    }
    return (
      <UsersComponent
        users={personas}
        signIn={this.props.signIn}
        signOut={this.props.signOut}
        numUsers={Object.keys(personas).length}
      />
    );
  }
}
