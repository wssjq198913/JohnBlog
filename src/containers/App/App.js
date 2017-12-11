import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import nprogress from 'nprogress';
import { Navbar, Playbar, GoTop, Burger } from '../../components/index';
import { loadAllCategories } from '../../actions';
import style from './App.scss';
if (__CLIENT__) {
  require('nprogress/nprogress.css');
}

class App extends Component {
  showMenu(event) {
    $('.menu').addClass('collapsed');
    $('.collapse').removeClass('in');
    $('body').addClass('menu-collapsed');
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
    if(this.props.allCategories == null || this.props.allCategories.length == 0){
      this.props.loadAllCategories();
    }
  }
  render() {
    return (
      <div className={style.app} onClick={() => this.hideMenu()} ref={(component) => { this.App = component; }}>
        <GoTop />
        <Burger click={(e) => this.showMenu(e)} />
        <Navbar categories={this.props.allCategories}/>
        {this.props.children}
        <Playbar />
      </div>
    );
  }
}

// Define PropTypes
App.propTypes = {

};

App.InitialAction = () => {
  return loadAllCategories();
}

const mapStateToProps = (state) => ({
  allCategories: state.reducers.categories
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllCategories: () => {
      dispatch(App.InitialAction());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

