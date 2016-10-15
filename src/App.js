import React from 'react';
import { connect } from 'react-redux';

const App = ({url}) =>
  <div>
    <img style={{ maxWidth: '100%', maxHeight:'100%' }} src={url} alt={url} role='presentation' 
    onLoad={() => console.log('Loaded')}
    onError={() => console.log('Error')}/>
  </div>

export default connect(
  state => ({ url: state.url })
)(App);
