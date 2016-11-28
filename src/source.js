import { Observable } from 'rxjs';

/*
export const img$ = Observable
    .ajax('http://piserver:5555/media')
    .switchMap(x => Observable.from(x.response))
    .filter(x => x['tags'].some(y => y === 'ejjel-nappal'))
    .zip(Observable.interval(5000).startWith(0))
    .map(x => x[0])
    .map(x => ({ title: x['name'], url: x['icon'] }))
    .do(x => console.log(x))
*/

export const img$ = Observable
    .ajax(`/EarthPorn.json`)
    .map(x => x.response)
    .map(x => x.data.children)
    .switchMap(items => Observable.zip(
        Observable.timer(0,5000),
        Observable.from(items)
    ))
    .map(x => x[1])
    .do(x => console.log(x))
    .map(x => x.data)
    .map(({ title, thumbnail }) => ({
        title,
        url: thumbnail
    }))
