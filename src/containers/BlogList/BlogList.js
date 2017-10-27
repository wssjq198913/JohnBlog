import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class BlogList extends Component {
  render() {

    return (
      <div>
      <div>teststs</div>
      <Link to="/blogdetail">detail</Link>
      </div>
    );
  }
}

// Define PropTypes
BlogList.propTypes = {
  
};

const mapStateToProps = () => ({
});

// const mapDispatchToProps = () => {
// };

export default connect(mapStateToProps, null)(BlogList);

