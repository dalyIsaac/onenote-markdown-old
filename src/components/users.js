import * as React from 'react';
import UsersComponent from './usersComponent';
import { PersonaInitialsColor } from 'office-ui-fabric-react/lib/Persona';

export default class UsersContainer extends React.Component {
    componentWillMount() {
        if (Object.keys(this.props.users).length === 0) {
            this.props.redirectToAbout();
        }
    }

    render() {
        let personas = [];
        for (const userId in this.props.users) {
            const user = this.props.users[userId];
            const persona = {
                imageInitials: user.name.split(' ').reduce((acc, val) => acc + val[0], ''),
                imageUrl: user.photo,
                personaName: user.displayableId,
                userName: user.name,
                initialsColor: PersonaInitialsColor[personas.length % 13]
            };
            personas.push(persona);
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