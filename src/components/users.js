import * as React from 'react';
import { Facepile } from 'office-ui-fabric-react/lib/Facepile';
import { PersonaSize } from 'office-ui-fabric-react/lib/Persona';

export class UsersComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Facepile
                personaSize={PersonaSize.size40}
                personas={this.props.users}
            />
        );
    }
 
}
