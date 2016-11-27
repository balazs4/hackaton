import { Observable } from 'rxjs';

export const img$ = Observable
  .interval(1000)
  .map(x => ({
    title: x,
    url: x
  }));