// React
import React from "react";
import ReactDOM from "react-dom";

// Redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import rootSaga from "./sagas";

// react-router, connected-react-router
import { Route, Switch } from "react-router";
import PrivateRoute from "./routing";
import { createBrowserHistory } from "history";
import {
  routerMiddleware,
  connectRouter,
  ConnectedRouter
} from "connected-react-router";

// office-ui-fabric
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

// App components
import App from "./App";
import AboutContainer from "./containers/about";
import HeaderContainer from "./containers/header";
import { SettingsComponent } from "./components/settings";
import "./index.css";

initializeIcons();

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(
    compose(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  )
);
sagaMiddleware.run(rootSaga);

const Container = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Fabric>
          <HeaderContainer />
          <Switch>
            <PrivateRoute path="/settings" component={SettingsComponent} />
            <PrivateRoute exact path="/" component={App} />
            <Route path="/about" component={AboutContainer} />
          </Switch>
        </Fabric>
      </ConnectedRouter>
    </Provider>
  );
};

ReactDOM.render(<Container />, document.getElementById("root"));
registerServiceWorker();
