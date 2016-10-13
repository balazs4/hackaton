import React, {Component} from 'react';
import {get} from 'axios';
import {decodeHTML} from 'entities';
import 'js-array-extensions';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    get('https://api.reddit.com/r/EarthPorn/')
      .then((res) => {
        this.setState({
          content: res
            .data
            .data
            .children
            .skip(1)
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
  }


  render() {
    const {content = []} = this.state;
    return (
      <div style={{ width: '100%' }}>
        {content.map(({url, id}) => <img src={url} key={id} style={{ maxWidth: '100%' }} role='presentation'/>) }
        <a href="https://www.reddit.com/r/EarthPorn" target="_blank">Source</a>
      </div>
    );
  }
}

export default App;
