import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav'
import Main from './Components/GitHup/Main'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Data from './Components/GitHup/Data';
import Specific from './Components/GitHup/Specific';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route exact path='/' Component={ Main } />
            <Route extact path='/Data/:Id' Component={ Data } />
            <Route exact path='/Specific/:login' Component= { Specific } />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
