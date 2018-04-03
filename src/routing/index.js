import * as React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Object.keys(rest.users).length > 0 ? (
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

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = () => ({
  // nothing here yet
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
