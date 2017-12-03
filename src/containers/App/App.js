import React, { Component } from 'react';
import { connect } from 'react-redux';
import nprogress from 'nprogress';
import style from './App.scss';
if (__CLIENT__) {
  require('nprogress/nprogress.css');
}

class App extends Component {
  showMenu(event) {
    document.body.className = 'menu-collapsed';
    event.stopPropagation();
  }
  hideMenu() {
    document.body.className = '';
  }
  componentDidMount() {
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
        {React.cloneElement(this.props.children, { showMenu: this.showMenu })}
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

