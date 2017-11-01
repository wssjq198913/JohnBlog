import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import style from './BlogList.scss';
import { Navbar, ArticleCard, Burger } from '../../components/index';

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
      </div>
    );
  }
}

// Define PropTypes
BlogList.propTypes = {

};

const mapStateToProps = () => ({
});

// const mapDispatchToProps = (dispatch) => {
//   load: () => {
//       dispatch();
//   }
// };

export default connect(mapStateToProps, null)(BlogList);

