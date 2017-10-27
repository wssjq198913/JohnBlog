import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class BlogDetail extends Component {
  render() {

    return (
      <div>this is detail</div>
    );
  }
}

// Define PropTypes
BlogDetail.propTypes = {
  
};

const mapStateToProps = () => ({
});

// const mapDispatchToProps = () => {
// };

export default connect(mapStateToProps, null)(BlogDetail);

