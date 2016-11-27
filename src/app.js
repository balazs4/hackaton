import { h, Component } from 'preact';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

class App extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.subs = Observable
      .interval(1000)
      .subscribe(x => this.setState({
        img: x
      }));
  }

  componentWillUnmount() {
    if (this.subs)
      this.subs.unsubscribe();
  }

  render({}, {img}) {
    return (
      <div>
        <span>{img}</span>
      </div>
    )
  }
}
export default App;
