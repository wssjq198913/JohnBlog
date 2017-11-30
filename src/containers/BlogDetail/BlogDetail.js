import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import marked from 'marked';
import { loadBlogDetail } from '../../actions';
import { Navbar, Burger, GoTop } from '../../components/index';
import style from './BlogDetail.scss'; 

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
    if (this.props.content == null || 
      this.props.content == '' || 
      this.props.topic != this.props.params.topic) {
      this.props.load(`${this.props.params.year}/${this.props.params.month}/${this.props.params.day}`, this.props.params.topic);
    }
  }
  render() {
    return (
      <div className='container'>
        <GoTop />
        <Navbar />
        <Burger click={(e) => this.props.showMenu(e)} />
        { this.props.loading ? <div>loading</div> :
        <article className={style.article} dangerouslySetInnerHTML={{__html: this.props.content}}></article>
        }
      </div>
    );
  }
}

BlogDetail.InitialAction = (date, topic) => {
  return loadBlogDetail(date, topic);
}

// Define PropTypes
BlogDetail.propTypes = {
  
};

const mapStateToProps = (state) => ({
  content: state.reducers.detail.content == null ? '' : marked(state.reducers.detail.content),
  date: state.reducers.detail.date,
  topic: state.reducers.detail.topic,
  loading: state.reducers.loading
});

const mapDispatchToProps = (dispatch) => {
  return {
    load: (date, topic) => {
      dispatch(BlogDetail.InitialAction(date, topic));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);

