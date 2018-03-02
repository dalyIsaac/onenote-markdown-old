import * as React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (rest.users.length > 0) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  } else {
    rest.users.forEach(element => {
      if (element.acquireTokenError !== null) {
        return (
          <Route
            {...rest}
            render={props => (
              <Redirect
                to={{
                  pathname: "/about",
                  state: { from: props.location }
                }}
              />
            )}
          />
        );
      }
    });
  }
};

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = () => ({
  // nothing here yet
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
