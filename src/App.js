import React, { Component } from 'react';
import './App.css';
import Set from './Set.js';

const REBRICKABLE_API_KEY='0b6a4abaa97580f8f57ec86abe790907'

class App extends Component {
  state = { 
    sets: [],
    themeIds: [],
    themes: [],
  }

  componentDidMount() {
    this.fetchSets();
  }

  fetchThemes = () => {
    fetch('https://rebrickable.com/api/v3/lego/themes?page_size=700&ordering=parent_id', {
      headers: {
        'Authorization': 'key ' + REBRICKABLE_API_KEY
      }})
      .then(res => res.json())
      .then(json => {
        this.setState({ 
          themes: json.results.filter(theme => this.state.themeIds.indexOf(theme.id) >= 0)
        });
      });
  }

  fetchSets = () => {
    fetch('https://rebrickable.com/api/v3/lego/sets/?min_year=2015&page_size=300', {
      headers: {
        'Authorization': 'key ' + REBRICKABLE_API_KEY
      }})
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({ 
          sets: json.results,
          themeIds: json.results.map(set => set.theme_id)
        });
        this.fetchThemes();
      });
  }

  render() {
    return (
      <div className="App">
       <ul className="cloud">
        {
          this.state.themes.map(function(t, i){
            return <li>{t.name}</li>;
        })}
        </ul>
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
