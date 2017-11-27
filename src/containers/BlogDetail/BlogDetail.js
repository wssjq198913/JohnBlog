import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import marked from 'marked';
import { loadBlogDetail } from '../../actions';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

class BlogDetail extends Component {
  componentDidMount() {
    this.props.load();
  }
  render() {
    return (
      <div>this is detail
        <article dangerouslySetInnerHTML={{__html: this.props.content}}></article>
      </div>
    );
  }
}

BlogDetail.InitialAction = () => {
  return loadBlogDetail();
}

// Define PropTypes
BlogDetail.propTypes = {
  
};

const mapStateToProps = (state) => ({
  content: state.reducers.detail.Content == null ? '' : marked(state.reducers.detail.Content)
});

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(BlogDetail.InitialAction());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);

