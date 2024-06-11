import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav'
import Main from './Components/GitHub/Main'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Nav />
        <Router>
          <Routes>
            <Route exact path='/' Component={Main} />
          </Routes>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
