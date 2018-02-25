import React, { Component } from 'react';
import HeaderComponent from './components/header';
import { connect } from 'react-redux';
import { authenticate } from './actions';

class App extends Component {
  componentWillMount() {
    this.props.authenticate();
  }
  render() {
    // this.props.authenticate();
    return (
      <div>
        <HeaderComponent />
      </div>
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
