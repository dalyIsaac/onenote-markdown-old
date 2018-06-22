import { Location } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { RouteComponentProps } from "react-router";
import { IState } from "./reducers";
import { IUserDataObject } from "./types/UserData";

interface IRest {
  computedMatch: object;
  exact: boolean;
  location: Location;
  path: string;
  users: IUserDataObject;
}

interface IEverything extends IRest {
  component: React.ComponentClass;
}

function redirect(
  props: RouteComponentProps<{}>,
  Component: React.ComponentClass,
  rest: IRest
) {
  return rest.users !== {} ? (
    <Component {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/about",
        state: { from: props.location }
      }}
    />
  );
}

const PrivateRoute = ({ component: Component, ...rest }: IEverything) => (
  /* tslint:disable-next-line */
  <Route {...rest} render={props => redirect(props, Component, rest)} />
);

const mapStateToProps = (state: IState) => ({
  users: state.users
});

const mapDispatchToProps = () => ({
  // nothing here yet
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
