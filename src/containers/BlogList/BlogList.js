import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class BlogList extends Component {
  render() {

    return (
      <div>teststs</div>
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

