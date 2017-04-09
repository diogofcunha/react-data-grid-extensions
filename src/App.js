import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Check the extensions in action</h2>
        </div>
        <div className="Example-grid-container">
          <Grid />
        </div>
      </div>
    );
  }
}

export default App;
