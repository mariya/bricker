import React, { Component } from 'react';
import './App.css';
import Set from './Set.js';

const REBRICKABLE_API_KEY='0b6a4abaa97580f8f57ec86abe790907'
const MIN_SETS=40

class App extends Component {
  state = { 
    sets: [],
    randomTheme: '',
    finding: true,
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
          sets: [],
          randomTheme: randomTheme,
          finding: true,
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
        console.log(json)
        if (json.results.length < MIN_SETS) {
          return this.fetchRandomTheme();
        }
        this.setState({ 
          sets: json.results,
          themeIds: json.results.map(set => set.theme_id),
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
