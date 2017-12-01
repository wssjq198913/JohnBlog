import React, { Component } from 'react';
import $ from 'jquery';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Navbar, ArticleCard, Burger, GoTop, Logo } from '../../components';
import { loadBlogs, cleanBlogDetail } from '../../actions';

class BlogList extends Component {
  constructor(...props) {
    super(...props);
  }
  componentDidMount() {
    $('body').removeClass('menu-collapsed');
    if(this.props.blogs == null || this.props.blogs.length == 0){
      this.props.load();
    }
    this.props.cleanBlogDetail();
    if (__CLIENT__) {
      require('jquery-lazy');
      $('.lazy').lazy({bind: 'event'});
    }
  }

  render() {
    return (
      <div>
        <GoTop />
        <Navbar />
        <Burger click={(e) => this.props.showMenu(e)} />
        <section className='container'>
          <Logo />
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
    },
    cleanBlogDetail: () => {
      dispatch(cleanBlogDetail());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);

