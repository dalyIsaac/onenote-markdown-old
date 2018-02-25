import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers';

import './index.css';
import App from './App';
import { Settings } from './components/settings';

import rootSaga from './sagas';
import registerServiceWorker from './registerServiceWorker';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, historyMiddleware)));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Fabric>
                <Route exact path="/" component={App} />
                <Route path="/settings" component={Settings} />
            </Fabric>
        </ConnectedRouter>
    </Provider>,
 document.getElementById('root'));
registerServiceWorker();
