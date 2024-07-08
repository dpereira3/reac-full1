import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Main from './Components/GitHup/Main';
import Data from './Components/GitHup/Data';
import Specific from './Components/GitHup/Specific';
import Favorite from './Components/Favorite/Favorite';
import LoginRegister from './Components/LoginRegister/MainPage';
import Profile from './Profile/Profile';

// Action
import { reUserState } from './Store/Actions';

// Private Route
import PrivateRoute from './PrivateRoute';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
// Store
import { createStore } from 'redux';
import rootReducer from './Store/Reducers';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthentication:false };

    // Create Store
    this.store = createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  // check if user is auth
  async componentDidMount(){
    if(localStorage.getItem('token')){
      this.store.dispatch(reUserState(true));
      this.setState({ isAuthentication:true })
    } else {
      this.store.dispatch(reUserState(false));
      this.setState({ isAuthentication:false })
    }
    await this.store.subscribe( () => {
      this.setState({ isAuthentication: this.store.getState()['Users']['isAuthenticated']})
    })
  }

  logout = () => {
    localStorage.removeItem('token');
    this.store.dispatch(reUserState(false));
    this.setState({ auth: false });
  }

  render() {
    return (
      <React.Fragment>
        <Provider store={this.store}>
          <Router>
              <Nav Logout={this.logout}  store={this.store} />
              <Route exact path='/' component={ Main } />
              <Route extact path='/Data/:id' component={ Data } />
              <Route exact path='/Specific/:login' component= { Specific } />
              <Route exact path='/Favorite' component= { Favorite } />
              <Route exact path='/LoginRegister' component= { LoginRegister } />
              <PrivateRoute exact path='/Profile' Logout={this.logout} Auth={this.state.isAuthentication} component={Profile} />
          </Router>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
