import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        rest.users.length > 0 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/about",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );

const mapStateToProps = (state) => ({
    users: state.users
});

const mapDispatchToProps = () => ({
    // nothing here yet
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
