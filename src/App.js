import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Main from './Main'
import Address from './Address'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://www.blockchain.com/Resources/white-blockchain.svg?ca07df6c19342fb6" alt="Blockchain logo"/>
        </header>
        <h2>Enter a BTC address to view transaction history</h2>
        <Main/>
      </div>
    );
  }
}

export default App;
