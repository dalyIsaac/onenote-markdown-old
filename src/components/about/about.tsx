import { ActionButton } from "office-ui-fabric-react";
import * as React from "react";
import { IPropsAbout } from "src/containers/about";
import "./about.css";

class About extends React.Component<IPropsAbout> {
  public render() {
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

        <h2>Privacy statement</h2>
        <p>
          This application collects only your OneNote and Microsoft Account
          data. This data is stored locally. Your data is not processed and
          transmitted to any other parties other than the Microsoft Graph. This
          application only stores data, allows the editing of your OneNote data,
          and transmits the changes back to the Microsoft Graph.
        </p>
        <h2>Terms of service</h2>
        <p>
          This is not ready for any sort of use, so we do not take
          responsibility for any possible damages to your data. By signing in
          you agree with these terms.
        </p>
      </div>
    );
  }
}

export default About;
