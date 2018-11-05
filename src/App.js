import React, { Component } from 'react';
import './App.css';
import Set from './Set.js';

const REBRICKABLE_API_KEY='0b6a4abaa97580f8f57ec86abe790907'
const MIN_SETS=40

class App extends Component {
  state = { 
    sets: [],
    themes: [],
    randomTheme: '',
    finding: true,
  }

  componentDidMount() {
    this.fetchThemes();
  }

  fetchThemes = () => {
    fetch('https://rebrickable.com/api/v3/lego/themes?page_size=700&ordering=parent_id', {
      headers: {
        'Authorization': 'key ' + REBRICKABLE_API_KEY
      }})
      .then(res => res.json())
      .then(json => {
        this.setState({ 
          themes: json.results
        });
        this.fetchRandomSets();
      });
  }

  fetchRandomSets = () => {
    const randomIndex = Math.floor(Math.random() * Math.floor(this.state.themes.length - 1));
    const randomTheme = this.state.themes[randomIndex];

    fetch('https://rebrickable.com/api/v3/lego/sets/?page_size=300&theme_id=' + randomTheme.id, {
      headers: {
        'Authorization': 'key ' + REBRICKABLE_API_KEY
      }})
      .then(res => res.json())
      .then(json => {
        if (json.results.length < MIN_SETS) {
          return this.fetchRandomSets();
        }
        this.setState({ 
          sets: json.results,
          randomTheme: randomTheme,
          finding: false
        });
      });
  }

  statusMessage = () => {
    if (this.state.finding) {
      return <div className="status">Hold tight, finding you some random lego sets...</div>;
    } else {
      return <div className="status">We found you this random-ass lego:</div>;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="banner">Your one-stop shop for Christmas Lego for your colleagues at SNP&SEQ</div>

        <div className="logo">
          <img className="dice" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Dice_simple.svg/2000px-Dice_simple.svg.png" />
          <h1>Bricker</h1>
        </div>  

        {/* TODO: put RandomButton here */}
        
        {this.statusMessage()}
        <h2>{this.state.randomTheme.name}</h2>
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
