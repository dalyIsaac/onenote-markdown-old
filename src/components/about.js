import * as React from "react";
import { ActionButton } from "office-ui-fabric-react/lib/Button";
import "./about.css";

class AboutComponent extends React.Component {
  render() {
    return (
      <div className="hero">
        <h1>Kia ora</h1>
        <h2>Very eloquent and witty content can be found here</h2>
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

export default AboutComponent;
