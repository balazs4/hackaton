import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'rxjs';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import App from './App';

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'IMAGES_LOADED':
      return Object.assign({}, state, payload)
    case 'NEXT_IMAGE':
      return Object.assign({}, state,
        { index: state.index + 1 },
        payload
      )

    default:
      return state
  }
}

const initstate = { fallback: 'https://www.redditstatic.com/icon.png' }

const nextImageEpic = (action$,s) =>
  action$
    .ofType('NEXT_IMAGE')
    .takeUntil(action$.filter(action => s.getState().index >= s.getState().images.length))
    .delay(5000)
    .mapTo({ type: 'NEXT_IMAGE' })


const loadImageEpic = action$ =>
  action$
    .ofType('IMAGES_LOADED')
    .mapTo({ type: 'NEXT_IMAGE', payload: { index: 0 } })

const store = createStore(
  reducer,
  initstate,
  composeWithDevTools(
    applyMiddleware(createEpicMiddleware(combineEpics(loadImageEpic, nextImageEpic)))
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


import { get } from 'axios';
import { decodeHTML } from 'entities';

get('https://api.reddit.com/r/EarthPorn/')
  .then((res) => {
    const images = res
      .data
      .data
      .children
      .slice(1)
      .filter(d => /flickr/.test(d.data.url) === false)
      .map(d => {
        const url = decodeHTML(d.data.url);
        return {
          url: /\/\/imgur.com/.test(url)
            ? url.replace('//imgur.com', '//i.imgur.com') + '.jpg'
            : url,
          id: d.data.id
        };
      })
    store.dispatch({ type: 'IMAGES_LOADED', payload: { images, index: 0 } })
  })
  .catch((err) => {
    console.error(err);
  });

