import React from "react";
import NotebookPickerContainer from "./containers/notebookPicker";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <div>
        <NotebookPickerContainer />
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
