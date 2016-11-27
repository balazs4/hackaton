import { Observable } from 'rxjs';

export const img$ = Observable
    .ajax('http://piserver:5555/media')
    .switchMap(x => Observable.from(x.response))
    .filter(x => x['tags'].some(y => y === 'ejjel-nappal'))
    .zip(
        Observable.interval(5000).startWith(0)
    )
    .map(x => x[0])
    .map(x => ({ title: x['name'], url: x['icon'] }))
    .do(x => console.log(x))
