import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Main from './Components/GitHup/Main';
import Favorite from './Components/Favorite/Favorite';

import { BrowserRouter as Router, route, Route } from 'react-router-dom';
import Data from './Components/GitHup/Data';
import Specific from './Components/GitHup/Specific';

import { Provider } from 'react-redux';

// Store
import { createStore } from 'redux';
import rootReducer from './Store/Reducers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };

    // Create Store
    this.Store = createStore(
      rootReducer,
      window.__REDUX_DEVTool_EXTENSION__&&
      window.__REDUX_DEVTool_EXTENSION__()
    );
  }


  render() {
    return (
      <React.Fragment>
        <Provider store= {this.Store}>
          
          <Router>
              <Nav store= {this.Store} />
              <Route exact path='/' component={ Main } />
              <Route extact path='/Data/:id' component={ Data } />
              <Route exact path='/Specific/:login' component= { Specific } />
              <Route exact path='/Favorite' component= { Favorite } />
          </Router>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
