import React, { Component } from 'react';
import { connect } from 'react-redux';

const App = ({url}) =>
  <div style={{ width: '100%' }}>
    <img style={{ width: '100%' }} src={url} alt="EarthPorn" role='presentation' />
    <a href="https://www.reddit.com/r/EarthPorn" target="_blank">Source</a>
  </div>

export default connect(
  state => ({ url: state.url })
)(App);
