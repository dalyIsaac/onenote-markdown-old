import React from "react";
import HeaderContainer from "./containers/header";
import NotebookPickerContainer from "./containers/notebookPicker";
import { connect } from "react-redux";
import { authentication } from "./actions";

class App extends React.Component {
  componentWillMount() {
    this.props.authenticate();
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <NotebookPickerContainer />
      </div>
    );
  }
}

const mapStateToProps = () => ({
  // nothing here yet
});

const mapDispatchToProps = dispatch => {
  return {
    authenticate: () => {
      dispatch(authentication.authenticate(dispatch));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
