import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import config from '../../config';
import routes from '../../routes';
import styles from './App.scss';

class App extends Component {
  render() {

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
      </div>
    );
  }
}

// Define PropTypes
App.propTypes = {

};

const mapStateToProps = () => ({
});

// const mapDispatchToProps = () => {
// };

export default connect(mapStateToProps, null)(App);

