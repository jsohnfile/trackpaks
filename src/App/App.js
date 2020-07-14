import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import './App.css';

import HomePage from '../pages/HomePage/HomePage';
import AccountPage from '../pages/AccountPage/AccountPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">TrackPaks</header>
      <nav>
        <>
          <NavLink exact to="/home" className="App-link">Home</NavLink>
          <NavLink exact to="/account" className="App-link">Account</NavLink>
        </>
      </nav>
      <main>
        <Switch>
          <Route exact path='/home' render={({ history }) =>
            <HomePage />
          } />
          <Route exact path='/account' render={({ history }) =>
            <AccountPage />
          } />

        </Switch>
      </main>
    </div>
  );
}

export default App;
