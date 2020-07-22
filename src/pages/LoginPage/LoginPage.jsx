import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import userService from '../../utils/userService';

class LoginPage extends Component {
  
  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      this.props.handleSignupOrLogin();
      this.props.history.push('/');
    } catch (err) {
      alert('Invalid Credentials!');
    }
  }

  render() {
    return (
      <div className="LoginPage">
        <header className="header-footer">
          <h1>Welcome to TrackPaks</h1>
          <p className="LoginPage-message">TrackPaks is a one-stop shop to monitor and store your pending packages. Life can't get any easier. Start using your TrackPaks app today!</p>
        </header>
        <div className="LoginPage-form-container">
          <p className="LoginPage-form-header">Log In</p>
          <form className="LoginPage-form" onSubmit={this.handleSubmit} >
            <div className="form-group">
              <div className="col-sm-12">
                <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="login-btn-container">
                <button className="login-btn">Log In</button>&nbsp;&nbsp;&nbsp;
              </div>
            </div>
          </form>
          <p className="LoginPage-signup-msg">Don't have an account yet? <Link to='/signup'>Sign Up</Link></p>
        </div>
      </div>
    );
  }
}

export default LoginPage;