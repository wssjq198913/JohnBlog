import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, ArticleCard } from '../../components/index';
import style from './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = { menuCollapsed: false};
  }
  showMenu(event, b) {
    document.body.className = 'menu-collapsed';
    event.stopPropagation();
    console.log(b);
  }
  hideMenu() {
    document.body.className = '';
  }
  render() {
    const articles = [1,2,3,4,5,6];
    return (
      <div className={style.app} onClick={() => this.hideMenu()} ref={(component) => { this.App = component; }}>
        <Navbar menuCollapsed = {this.state.menuCollapsed}/>
        <div className={style.menu}>
          <button onClick={(e) => this.showMenu(e)}>menu</button>
        </div>
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

