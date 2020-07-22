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
    menuClicked: false,
    delivered: false,
    status: []
  }
  
  handleDelivered = (status) => {
    let statusArr = this.state.status;
    statusArr.push(status);
    this.setState({delivered: statusArr.includes("DELIVERED"), status: statusArr});
    console.log(statusArr, "<---status");
  }

  handleSignupOrLogin = () => {
    this.setState({
      user: userService.getUser()
    }, () => this.getAllPackages());
  }

  handleLogout = () => {
    userService.logout();
    this.setState({
      user: null,
      status: []
    }, () => this.props.history.push('/'));
  }

  handleAddPackage = async newPackageData => {
    await packageService.createPackageAPI(newPackageData);
    this.getAllPackages();
  }

  handleDeletePackage = async idOfPackageToDelete => {
    await packageService.deletePackageAPI(idOfPackageToDelete);
    this.setState(state => ({
      packages: state.packages.filter(orderPackage => orderPackage._id !== idOfPackageToDelete),
      status:[]
    }), () => this.getAllPackages())
  }

  handleUpdatePackage = async data => {
    await packageService.updatePackageAPI(data);
    this.getAllPackages();
  }



  getAllPackages = async () => {
    const packages = await packageService.getAllPackagesAPI();
    this.setState({
      packages,
      status: []

    }, () => {
      this.handleDelivered()
      this.props.history.push('/account')
      
    });
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
          <div className="context">
          <header className="App-header">
          <div id="navbar">
            <button className="openbtn" onClick={this.handleMenuClick}><img className="App-logo" src="https://i.imgur.com/6ip1UVz.png" /></button>
            <div className="App-trackpaks">TrackPaks</div>
          </div>
          </header>
          <main>

            <div className="sidebar" id="mySidebar" style={this.state.menuClicked ? {"display": "block"}: {"display": "none"}}>
              <div className="closebtn-container" ><button className="closebtn" onClick={this.handleMenuClick}>X</button></div>
              {userService.getUser() ?
                <div className="App-links">
                  <p className="welcome-user">{userService.getUser().name ? `WELCOME, ${userService.getUser().name.charAt(0).toUpperCase()}${userService.getUser().name.slice(1)}` : ''}</p>

                  <p><NavLink exact to="/account" >
                  <div className="account-link-container">
                    <div id="myaccount">MY ACCOUNT</div>
                    <div className="notification-div">
                      <div className="notification" style={this.state.delivered?{"display":"block"}:{"display":"none"}}>!</div>
                    </div>
                  </div>
                    </NavLink>
                  </p> 

                  <p><NavLink exact to="/add" className="App-link">ADD A PACKAGE</NavLink></p> 

                  <p><NavLink exact to='/track' className="App-link">QUICK TRACK</NavLink></p> 

                  <p><NavLink exact to='/logout' className="App-link" onClick={this.handleLogout}>LOGOUT</NavLink></p> 
                </div>
                :
                <div className="App-links" id="signup-login">
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
                  <AccountPage packages={this.state.packages} handleDeletePackage={this.handleDeletePackage} user={this.state.user} handleDelivered={this.handleDelivered}/>
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
        <footer>
          <div className="footer-prop">Trackpaks a jsohnfile</div>
          <a className="footer-prop" href="https://github.com/jsohnfile/trackpaks"><img src="https://i.imgur.com/u8ZIvk4.png"></img></a>
        </footer>

        </div>
        <div className="area" >
                <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                </ul>
        </div>
      </div>
    );
  }
}

export default App;
