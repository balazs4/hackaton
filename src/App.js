import React from 'react';
import { connect } from 'react-redux';

const App = ({url}) =>
  <div>
    <img style={{ width: '100%', maxHeight:'100%' }} src={url} alt="EarthPorn" role='presentation' />
  </div>

export default connect(
  state => ({ url: state.url })
)(App);
