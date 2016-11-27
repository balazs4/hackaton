import 'preact/devtools';
import { Observable } from 'rxjs';
import { h, render, Component } from 'preact';


import rxify from './rxify';
import Showcase from './showcase';
import { img$ } from './source';

render(
  h(rxify(Showcase, img$)),
  document.getElementById('app')
);
