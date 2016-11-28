import { Observable } from 'rxjs';

export const img$ = Observable
    .ajax({ url: `https://api.reddit.com/r/EarthPorn.json`, crossDomain: true })
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
