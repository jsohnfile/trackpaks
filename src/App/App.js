import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import './App.css';

import TrackAPackagePage from '../pages/TrackAPackagePage/TrackAPackagePage';
import AddPackagePage from '../pages/AddPackagePage/AddPackagePage';
import EditPackagePage from '../pages/EditPackagePage/EditPackagePage';
import AccountPage from '../pages/AccountPage/AccountPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import userService from '../utils/userService';
import * as packageService from '../utils/packageService';


class App extends Component {
  state = {
    packages: [],
    user: userService.getUser(),
    menuClicked: false
  }
  
  handleSignupOrLogin = () => {
    this.setState({
      user: userService.getUser()
    }, () => this.getAllPackages());
  }

  handleLogout = () => {
    userService.logout();
    this.setState({
      user: null
    }, () => this.props.history.push('/'));
  }

  handleAddPackage = async newPackageData => {
    await packageService.createPackageAPI(newPackageData);
    this.getAllPackages();
  }

  handleDeletePackage = async idOfPackageToDelete => {
    await packageService.deletePackageAPI(idOfPackageToDelete);
    this.setState(state => ({
      packages: state.packages.filter(orderPackage => orderPackage._id !== idOfPackageToDelete)
    }), () => this.props.history.push('/account'));
  }

  handleUpdatePackage = async data => {
    await packageService.updatePackageAPI(data);
    this.getAllPackages();
  }



  getAllPackages = async () => {
    const packages = await packageService.getAllPackagesAPI();
    this.setState({
      packages
    }, () => this.props.history.push('/account'));
  }

  handleMenuClick = () => {
    this.setState(
      {menuClicked: !this.state.menuClicked}
    )
  }

  componentDidMount() {
    this.getAllPackages()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div id="navbar">
          <button className="openbtn" onClick={this.handleMenuClick}><img className="App-logo" src="https://i.imgur.com/3fuPdBZ.png" /></button>
          <img className="App-trackpaks" src="https://i.imgur.com/X43Rqme.png" />
        </div>
        </header>
        <main>

          <div className="sidebar" id="mySidebar" style={this.state.menuClicked ? {"display": "block"}: {"display": "none"}}>
            <div className="closebtn-container" ><button className="closebtn" onClick={this.handleMenuClick}>X</button></div>
            {userService.getUser() ?
              <div className="App-links">
                <p className="welcome-user">{userService.getUser().name ? `WELCOME, ${userService.getUser().name.charAt(0).toUpperCase()}${userService.getUser().name.slice(1)}` : ''}</p>
                  &nbsp;&nbsp;&nbsp;
                <p><NavLink exact to="/account" className="account-link-container">MY ACCOUNT</NavLink></p> 
                  &nbsp;&nbsp;&nbsp;
                <p><NavLink exact to="/add" className="App-link">ADD A PACKAGE</NavLink></p> 
                  &nbsp;&nbsp;&nbsp;
                <p><NavLink exact to='/track' className="App-link">QUICK TRACK</NavLink></p> 
                  &nbsp;&nbsp;&nbsp;
                <p><NavLink exact to='/logout' className="App-link" onClick={this.handleLogout}>LOGOUT</NavLink></p> 
              </div>
              :
              <div className="App-links">
                  <NavLink exact to='/signup' className="App-link">SIGNUP</NavLink>
                  &nbsp;&nbsp;&nbsp;
                  <NavLink exact to='/' className="App-link">LOGIN</NavLink>
                  &nbsp;&nbsp;&nbsp;
              </div>
            }
          </div>
          <div className="content">
          <Switch>
            <Route exact path='/signup' render={({ history }) =>
                <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
              } />
              <Route exact path='/' render={({ history }) =>
                <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
              } />
              <Route exact path='/account' render={({ history }) =>
              userService.getUser() ?
                <AccountPage packages={this.state.packages} handleDeletePackage={this.handleDeletePackage} user={this.state.user}/>
                :
                <Redirect to='/login' />
            } />
            <Route exact path='/add' render={() =>
              userService.getUser() ?
                <AddPackagePage handleAddPackage={this.handleAddPackage}/>
                :
                <Redirect to='/login' />
            } />
            <Route exact path='/edit' render={({history, location}) =>
              userService.getUser() ?
                <EditPackagePage handleUpdatePackage={this.handleUpdatePackage} location={location}/>
                :
                <Redirect to='/login' />
            } />
             <Route exact path='/track' render={() =>
              userService.getUser() ?
                <TrackAPackagePage />
                :
                <Redirect to='/login' />
            } />
  
          </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
