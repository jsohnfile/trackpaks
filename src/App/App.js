import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import './App.css';

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

  // componentDidMount() {
  //   this.getAllPackages();
  //   let packagesCopy= [...this.state.packages];
  //   packagesCopy.map(async myPackage => {
  //     myPackage.details = await packageAPI.getAllPackageDetail(myPackage.carrier, myPackage.trackingNumber)
  //     console.log(myPackage.details)
  //   })
  //   this.setState({
  //     packages: [...packagesCopy],

  //   })
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">TrackPaks
          <nav>
          {userService.getUser() ?
            <>
            {userService.getUser().name ? `WELCOME, ${userService.getUser().name.toUpperCase()}` : ''}
              &nbsp;&nbsp;&nbsp;
              <NavLink exact to='/logout' onClick={this.handleLogout}>LOGOUT</NavLink>
              &nbsp;&nbsp;&nbsp;
              <NavLink exact to="/account" className="App-link">My Account</NavLink>
              &nbsp;&nbsp;&nbsp;
              <NavLink exact to="/add" className="App-link">Add a Package</NavLink>
              &nbsp;&nbsp;&nbsp;
            </>
            :
            <>
                <NavLink exact to='/signup' className="App-link">SIGNUP</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/' className="App-link">LOGIN</NavLink>
                &nbsp;&nbsp;&nbsp;
            </>
          }
          </nav>
        </header>
        <main>
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
  
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
