import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { ArticleCard } from '../../components';
import { loadBlogsByCategory } from '../../actions';

class Category extends Component {
  constructor(...props) {
    super(...props);
  }
  componentDidMount() {
    $('html').scrollTop(0);
    $('body').removeClass('menu-collapsed');
    if (this.props.blogsByCategory == null || this.props.blogsByCategory.length == 0) {
        this.props.load(this.props.params.category);
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.params.category != this.props.params.category) {
        newProps.load(newProps.params.category);
    }
  }

  render() {
    return (
      <div>
        <section className='container'>
          {
            this.props.blogsByCategory.map((item, index) => {
              return <ArticleCard key={index} {...item} gotoDetail={this.props.gotoDetail}/>;
            })
          }
        </section>
      </div>
    );
  }
}

Category.InitialAction = (category) => {
  return loadBlogsByCategory(category);
}

// Define PropTypes
Category.propTypes = {

};

const mapStateToProps = (state) => ({
    currentCategory: state.reducers.currentCategory,
    blogsByCategory: state.reducers.blogsByCategory
});

const mapDispatchToProps = (dispatch) => {
  return {
    load: (category) => {
        dispatch(Category.InitialAction(category));
    },
    gotoDetail: (date, title) => {
      dispatch(push(`/blogs/${date}/${title}`));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);

