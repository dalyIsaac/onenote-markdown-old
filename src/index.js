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

// react-router, react-router-redux
import { Route, Switch } from "react-router";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import PrivateRoute from "./routing";
import createHistory from "history/createBrowserHistory";

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

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();
let store = createStore(
  rootReducer,
  composeWithDevTools(
    compose(
      applyMiddleware(sagaMiddleware, historyMiddleware)
    ))
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
