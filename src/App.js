import React, { Component } from 'react';
import './App.css';
import Set from './Set.js';

const REBRICKABLE_API_KEY='0b6a4abaa97580f8f57ec86abe790907'

class App extends Component {
  state = { 
    sets: [],
    randomTheme: '',
  }

  componentDidMount() {
    this.fetchRandomTheme();
  }

  fetchRandomTheme = () => {
    fetch('https://rebrickable.com/api/v3/lego/themes?page_size=700&ordering=parent_id', {
      headers: {
        'Authorization': 'key ' + REBRICKABLE_API_KEY
      }})
      .then(res => res.json())
      .then(json => {
        const randomIndex = Math.floor(Math.random() * Math.floor(json.results.length - 1));
        const randomTheme = json.results[randomIndex];
        this.setState({ 
          randomTheme: randomTheme
        });
        this.fetchSets(randomTheme.id);
      });
  }

  fetchSets = (themeId) => {
    fetch('https://rebrickable.com/api/v3/lego/sets/?page_size=300&theme_id=' + themeId, {
      headers: {
        'Authorization': 'key ' + REBRICKABLE_API_KEY
      }})
      .then(res => res.json())
      .then(json => {
        this.setState({ 
          sets: json.results,
          themeIds: json.results.map(set => set.theme_id)
        });
      });
  }

  render() {
    return (
      <div className="App">
      <h1>{this.state.randomTheme.name}</h1>
        <ul>
        {
          this.state.sets.map(function(set, i){
            return <Set set={set} key={i} />;
        })}
        </ul>
      </div>
    );
  }
}

export default App;
