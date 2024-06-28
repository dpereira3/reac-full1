import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Main from './Components/GitHup/Main';
import Favorite from './Components/Favorite/Favorite';
import LoginRegister from './Components/LoginRegister/MainPage';

import { BrowserRouter as Router, route, Route } from 'react-router-dom';
import Data from './Components/GitHup/Data';
import Specific from './Components/GitHup/Specific';

import { Provider } from 'react-redux';

// Action
import { reUserState } from './Store/Actions';

// Store
import { createStore } from 'redux';
import rootReducer from './Store/Reducers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isAuthenticated: false
    };

    // Create Store
    this.Store = createStore(
      rootReducer,
      window.__REDUX_DEVTool_EXTENSION__&&
      window.__REDUX_DEVTool_EXTENSION__()
    );
  }

  logOut = () => {
    localStorage.removeItem('Token');
    this.store.dispatch(reUserState(false));
    this.setState({ isAuthenticated:false });
  }

  render() {
    return (
      <React.Fragment>
        <Provider store= {this.Store}>
          
          <Router>
              <Nav logout={this.logOut}  store= {this.Store} />
              <Route exact path='/' component={ Main } />
              <Route extact path='/Data/:id' component={ Data } />
              <Route exact path='/Specific/:login' component= { Specific } />
              <Route exact path='/Favorite' component= { Favorite } />
              <Route exact path='/LoginRegister' component= { LoginRegister } />
          </Router>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
