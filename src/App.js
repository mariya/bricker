import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Set from './Set.js';

const REBRICKABLE_API_KEY='0b6a4abaa97580f8f57ec86abe790907'

class App extends Component {
  state = { 
    sets: [],
  }

  componentDidMount() {
    this.fetchSets();
  }

  fetchSets = () => {
    fetch('https://rebrickable.com/api/v3/lego/sets/', {
      headers: {
        'Authorization': 'key ' + REBRICKABLE_API_KEY
      }})
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ sets: json.results });
      });
  }

  render() {
    return (
      <div className="App">
        <ul>
        {
          this.state.sets.map(function(set, i){
            return <Set set={set} key={i} />;
        })}
        </ul>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
