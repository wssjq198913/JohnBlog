//import rootSaga from '../sagas'; // TODO: Next step
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './../reducers/reducer';
import rootSaga from '../sagas/index';
import {createLogger} from 'redux-logger';

export default function createStore(history) {

  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, reduxRouterMiddleware];

  let composeEnhancers;

  middleware.push(sagaMiddleware);

  if (__DEVELOPMENT__) {
    middleware.push(createLogger());

    composeEnhancers =
      typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;
  }
  else {
    composeEnhancers = compose;
  }

  const enhancers = composeEnhancers(
    applyMiddleware(...middleware)
  );

  const store = _createStore(reducers, enhancers)

  sagaMiddleware.run(rootSaga) //register sagas

  return store;
}
