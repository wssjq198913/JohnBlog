import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar } from '../../components/index';

class App extends Component {
  render() {

    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

// Define PropTypes
App.propTypes = {

};

const mapStateToProps = () => ({
});

// const mapDispatchToProps = () => {
// };

export default connect(mapStateToProps, null)(App);

