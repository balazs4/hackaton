import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'NEXT_IMAGE':
      return { url: payload.url }

    default:
      return state
  }
}

const initstate = { url: 'https://camo.githubusercontent.com/b13830f5a9baecd3d83ef5cae4d5107d25cdbfbe/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3732313033382f313732383830352f35336532613364382d363262352d313165332d383964312d3934376632373062646430332e706e67' }

const store = createStore(
  reducer,
  initstate,
  composeWithDevTools()
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);





let images = [];
let index = 0;


const loop = setInterval(() => {
  if (images.length !== 0 && images.length === index) {
    clearInterval(loop);
    return;
  }
  store.dispatch({ type: 'NEXT_IMAGE', payload: images[index++] })
}, 5000);



import { get } from 'axios';
import { decodeHTML } from 'entities';

get('https://api.reddit.com/r/EarthPorn/')
  .then((res) => {
    images = res
      .data
      .data
      .children
      .slice(1)
      .filter(d => /flickr/.test(d.data.url) === false)
      .map(d => {
        const url = decodeHTML(d.data.url);
        return {
          url: /http:\/\/imgur.com/.test(url)
            ? url.replace('http://imgur.com', 'http://i.imgur.com') + '.jpg'
            : url,
          id: d.data.id
        };
      })
  })
  .catch((err) => {
    console.error(err);
  });
