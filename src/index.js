import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/create';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';

const store = createStore(window.__initialData__);
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