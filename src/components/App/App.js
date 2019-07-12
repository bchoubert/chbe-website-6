import React, { Component } from 'react';

import Header from './sections/Header/Header';

import Education from './sections/Education/Education';
import Networks from './sections/Networks/Networks';

import './App.css';

class App extends Component {
  render() {
    return <div className="App">
      <Header></Header>
      <Networks></Networks>
      <Education></Education>
    </div>;
  }
}

export default App;
