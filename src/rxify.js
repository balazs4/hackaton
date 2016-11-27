import { h, Component } from 'preact';

export default (MyComponent, source$) => {
    class RxProxy extends Component {
        componentWillMount() {
            this.sub = source$.subscribe(
                x => { this.setState({ source$: x }) },
            )
        }
        componentWillUnmount() {
            if (this.sub)
                this.sub.unsubscribe()
        }
        render({}, state) {
            return <MyComponent {...state} />
        }
    }
    return RxProxy;
}
