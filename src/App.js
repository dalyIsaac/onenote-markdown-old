import React from 'react';
import HeaderContainer from './containers/header';
import { connect } from 'react-redux';
import { authenticate } from './actions';

class App extends React.Component {
  componentWillMount() {
    this.props.authenticate();
  }

  render() {
    return (
      <div>
        <HeaderContainer />
      </div>
    );
  }
}

const mapStateToProps = () => ({
  // nothing here yet
})


const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => {
      dispatch(authenticate())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
