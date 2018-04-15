import React from "react";
import { ActionButton } from "office-ui-fabric-react/lib/Button";
import PropTypes from "prop-types";
import "./about.css";

class About extends React.Component {
  render() {
    return (
      <div className="hero">
        <h1>Kia ora</h1>
        <p>
          As you can see, this page has a lot of informative content describing
          the application in a verbose fashion.
        </p>
        <p>If you want, you can sign in below:</p>
        <ActionButton
          iconProps={{ iconName: "AddFriend" }}
          onClick={this.props.signIn}
        >
          Sign in
        </ActionButton>
      </div>
    );
  }
}

About.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default About;
