import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';


const Image = styled.img`
      max-width: 100%;
      max-height: 100%;
`;




const App = ({url}) =>
  <div>
    <Image
      src={url}
      alt={url}
      role='presentation'
      onLoad={() => console.log(`Loaded: ${url}`)}
      onError={() => console.log(`Error: ${url}`)} />
  </div>

export default connect(
  state => ({ url: state.url })
)(App);
