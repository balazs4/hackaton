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
  state => {
    if (state.images === undefined)
      return {
        url: state.fallback
      }

    if (state.index >= state.images.length)
      return {
        url: state.images[state.images.length - 1].url
      }

    return {
      url: state.images[state.index].url
    }
  }
)(App);
