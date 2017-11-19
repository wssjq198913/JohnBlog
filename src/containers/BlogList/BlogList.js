import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import style from './BlogList.scss';
import { push } from 'react-router-redux';
import { Navbar, ArticleCard, Burger, GoTop } from '../../components/index';
import { loadBlogs } from '../../actions';

class BlogList extends Component {
  constructor() {
    super();
    this.state = { menuCollapsed: false };
  }
  showMenu(event, ) {
    document.body.className = 'menu-collapsed';
    event.stopPropagation();
  }

  render() {
    const articles = [1, 2, 3, 4, 5, 6];
    return (
      <div>
        <GoTop/>
        <Navbar menuCollapsed={this.state.menuCollapsed} />
        <Burger click={(e) => this.showMenu(e)} />
        <section className={style.container}>
          {
            articles.map((index) => {
              return <ArticleCard key={index} />;
            })
          }
        </section>
        <Link to='/blogdetail'>go to detail</Link>
        <a onClick={this.props.gotoDetail}>go to detail(react-router-redux)</a>
      </div>
    );
  }
}

BlogList.InitialAction = () => {
  return loadBlogs();
}

// Define PropTypes
BlogList.propTypes = {

};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
    // load: () => {
    //     dispatch();
    // }
    gotoDetail: () => {
      dispatch(push('/blogdetail'));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);

