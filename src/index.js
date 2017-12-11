import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/create';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';

let store;
if (window.__initialData__ != null && window.__initialData__ != ''){
  store = createStore(window.__initialData__);
}
else {
  store = createStore();
}
const history = syncHistoryWithStore(browserHistory, store);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('react-root');

const renderApp = routes => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    </AppContainer>,
    MOUNT_NODE
  );
};

renderApp(routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    renderApp(newRoutes);
  });
}

if (module.hot) {
  // remove the annoying error when 'You cannot change <Router routes>' in HMR.
  // this is just a workaround.

  const orgError = console.error;
  console.error = (...args) => {
    if (args && args.length === 1  && args[0].indexOf('You cannot change <Router routes>;') > -1) {
      // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };
}