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
    .ajax({
        url: `https://api.reddit.com/r/EarthPorn.json`,
        crossDomain: true,
        //createXHR: () => new XMLHttpRequest()
    })
    .map(x => x.response)
    .map(x => x.data.children)
    .switchMap(items => Observable.zip(
        Observable.timer(0, 5000),
        Observable.from(items).filter(({ data: { url } }) => /i.imgur/.test(url))
    ))
    .map(x => x[1])
    .map(x => x.data)
    .map(({ title, url }) => ({
        title,
        url
    }))
    .do(x => console.log(x))
