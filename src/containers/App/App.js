import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import nprogress from 'nprogress';
import style from './App.scss';
import 'nprogress/nprogress.css';

class App extends Component {
  hideMenu() {
    document.body.className = '';
  }
  componentDidMount(){
    document.addEventListener('DOMContentLoaded', () => {
      nprogress.start();
    })
    window.addEventListener('load', () => {
      nprogress.done();
    })
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

