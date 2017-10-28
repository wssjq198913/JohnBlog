import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, ArticleCard } from '../../components/index';
import style from './App.scss';

class App extends Component {
  render() {
    const articles = [1,2,3,4,5,6];
    return (
      <div>
        <Navbar />
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

