import * as React from 'react';
import PropTypes from 'prop-types';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import './about.css';

class AboutComponent extends React.Component {
    
    componentWillMount() {
        if (this.props.users.length !== 0) 
        {
            this.props.redirectToApp();
        }
    }

    render() {
        return (
            <div className='hero'>
                <h1>Kia ora</h1>
                <h2>This is the about page for OneNoteMarkdown</h2>
                <p>As you can see, this page has a lot of informative content describing the application in a verbose fashion.</p>
                <p>If you want, you can sign in below:</p>
                <ActionButton
                    iconProps={{ iconName: 'AddFriend' }}
                    onClick={this.props.signIn}
                >
                    Sign in
                </ActionButton>
            </div>
        );
    }
}

AboutComponent.propTypes = {
    signIn: PropTypes.func.isRequired
};

export default AboutComponent;
