import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './BlogList.scss';
import { push } from 'react-router-redux';
import { Navbar, ArticleCard, Burger, GoTop } from '../../components/index';
import { loadBlogs } from '../../actions';

class BlogList extends Component {
  constructor() {
    super();
    this.state = { menuCollapsed: false };
  }
  componentDidMount() {
    if(this.props.blogs == null || this.props.blogs.length == 0){
      this.props.load();
    }
  }
  showMenu(event) {
    document.body.className = 'menu-collapsed';
    event.stopPropagation();
  }

  render() {
    return (
      <div>
        <GoTop/>
        <Navbar menuCollapsed={this.state.menuCollapsed} />
        <Burger click={(e) => this.showMenu(e)} />
        <section className={style.container}>
          {
            this.props.blogs.map((item, index) => {
              return <ArticleCard key={index} {...item} gotoDetail={this.props.gotoDetail}/>;
            })
          }
        </section>
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

const mapStateToProps = (state) => ({
  blogs: state.reducers.blogs
});

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
        dispatch(BlogList.InitialAction());
    },
    gotoDetail: (date, title) => {
      dispatch(push(`blogs/${date}/${title}`));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);

