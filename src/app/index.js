import React, { Component } from 'react';
import { connect } from 'react-redux';

import { apiSetup } from '../config/api';

import AppNavigator from './components/AppNavigator';

class App extends Component {
  componentWillMount() {
    apiSetup(this.props.dispatch);
  }

  render() {
    return <AppNavigator />;
  }
}

export default connect()(App);
