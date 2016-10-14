import React from 'react';
import { render } from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';

const reducer = (state, {type, payload}) => (state)

const initstate = {url:'https://i.redd.it/fcqheiijjgrx.jpg'}

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


/*
import {get} from 'axios';
import {decodeHTML} from 'entities';


 get('https://api.reddit.com/r/EarthPorn/')
      .then((res) => {
        this.setState({
          content: res
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
      })
      .catch((err) => {
        console.error(err);
      });
      */