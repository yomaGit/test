import React, { Component } from 'react';
import logo from '../../../assets/logo.svg';

import '../../../css/pages/app/index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
            <br/>
            <a href="#/app">to app</a> <a href="#/router_color">to router_color</a> <a href="#/color">to color</a> <a href="#/list">to list</a>
        </p>
      </div>
    );
  }
}

export default App;
