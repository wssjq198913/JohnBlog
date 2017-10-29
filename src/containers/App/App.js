import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, ArticleCard, Burger } from '../../components/index';
import style from './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = { menuCollapsed: false};
  }
  showMenu(event) {
    document.body.className = 'menu-collapsed';
    event.stopPropagation();
  }
  hideMenu() {
    document.body.className = '';
  }
  render() {
    const articles = [1,2,3,4,5,6];
    return (
      <div className={style.app} onClick={() => this.hideMenu()} ref={(component) => { this.App = component; }}>
        <Navbar menuCollapsed = {this.state.menuCollapsed}/>
        <Burger click={(e) => this.showMenu(e)}/>
        <section className={style.container}>
        {
          articles.map((index) => {
            return <ArticleCard key={index}/>;
          })
        }
        </section>
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

