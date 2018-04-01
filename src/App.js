import React from "react";
import Navbar from "./containers/navbar";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
