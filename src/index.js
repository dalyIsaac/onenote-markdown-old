import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';

import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'

import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
    <Fabric>
        <App />
        </Fabric>
    </Provider>,
 document.getElementById('root'));
registerServiceWorker();
