import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './App.scss';

class App extends Component {
  hideMenu() {
    document.body.className = '';
  }
  render() {
    return (
      <div className={style.app} onClick={() => this.hideMenu()} ref={(component) => { this.App = component; }}>
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

