import * as React from "react";
import { connect } from "react-redux";
import Navbar from "./containers/navbar";

class App extends React.Component {
  public render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

const mapStateToProps = () => ({
  // nothing here yet
});

const mapDispatchToProps = () => ({
  // nothing here yet
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
