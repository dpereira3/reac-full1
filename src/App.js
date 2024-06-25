import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Main from './Components/GitHup/Main';

import { BrowserRouter as Router, route, Route } from 'react-router-dom';
import Data from './Components/GitHup/Data';
import Specific from './Components/GitHup/Specific';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <React.Fragment>
        <Nav />
        <Router>
            <Route exact path='/' component={ Main } />
            <Route extact path='/Data/:id' component={ Data } />
            <Route exact path='/Specific/:login' component= { Specific } />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
