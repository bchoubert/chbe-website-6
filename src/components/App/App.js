import React, { Component } from 'react';

import Header from './sections/Header/Header';

import Education from './sections/Education/Education';
import Networks from './sections/Networks/Networks';
import Certifications from './sections/Certifications/Certifications';
import Projects from './sections/Projects/Projects';

import './App.css';

class App extends Component {
  render() {
    return <div className="App">
      <Header></Header>
      <Networks></Networks>
      <Education></Education>
      <Certifications></Certifications>
      <Projects></Projects>
    </div>;
  }
}

export default App;
