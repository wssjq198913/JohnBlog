//import rootSaga from '../sagas'; // TODO: Next step
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './../reducers';
import rootSaga from '../sagas/index';
import {createLogger} from 'redux-logger';

export default function createStore() {

  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(browserHistory);
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, reduxRouterMiddleware];

  let enhancedCompose;

  middleware.push(sagaMiddleware);

  if (process.env.NODE_ENV == 'development') {
    middleware.push(createLogger());

    enhancedCompose =
      typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;
  }
  else {
    enhancedCompose = compose;
  }

  const enhancers = enhancedCompose(
    applyMiddleware(...middleware)
  );

  const store = _createStore(reducers, enhancers)

  sagaMiddleware.run(rootSaga) //register sagas

  return store;
}
