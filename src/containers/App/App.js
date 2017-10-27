import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
// import config from '../../config';
// import styles from './App.scss';

class App extends Component {
  render() {

    return (
      <div>
          tsfsdfs
          {this.props.children}
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

