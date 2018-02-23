import React, { Component } from 'react';
import Users from './containers/users';
import { connect } from 'react-redux';
import { authenticate } from './actions';

class App extends Component {
  componentWillMount() {
    this.props.authenticate();
  }
  render() {
    // this.props.authenticate();
    return (
      <Users />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // nothing here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => {
      dispatch(authenticate())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
