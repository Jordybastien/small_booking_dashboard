import React, { Component } from 'react';
import Routing from './router';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/initialData';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { loading } = this.props;
    return !loading && <Routing />;
  }
}

const mapStateToProps = ({ loading }) => {
  return {
    loading,
  };
};

export default connect(mapStateToProps)(App);
