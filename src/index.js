import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import history from 'history';
import createStore from './store/create';
import { Provider } from 'react-redux';
import App from './containers/App/App';
const store = createStore(history);

const MOUNT_NODE = document.getElementById('react-root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
</Provider>
  , MOUNT_NODE);
