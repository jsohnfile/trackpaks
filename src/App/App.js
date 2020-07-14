import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import './App.css';

import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import userService from '../utils/userService';

class App extends Component {
  state = {
    user: userService.getUser(),
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">TrackPaks
          <nav>
            <>
              <NavLink exact to="/signup" className="App-link">signup</NavLink>
              &nbsp;&nbsp;&nbsp;
              <NavLink exact to="/login" className="App-link">Log In</NavLink>
              &nbsp;&nbsp;&nbsp;
            </>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path='/signup' render={({ history }) =>
                <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
              } />
              <Route exact path='/login' render={({ history }) =>
                <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
              } />
  
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
