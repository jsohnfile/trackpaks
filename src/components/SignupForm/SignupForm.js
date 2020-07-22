import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import "./SignupForm.css";

class SignupForm extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  };

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      this.props.handleSignupOrLogin();
      this.props.history.push('/');
    } catch (err) {
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div className="SignupForm-container">
        <form className="SignupForm-form" onSubmit={this.handleSubmit} >
          <p className="SignupForm-header">Sign Up</p>
          <div className="SignupForm-field">
            <input type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
          </div>
          <div className="SignupForm-field">
            <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
          </div>
          <div className="SignupForm-field">
            <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
          </div>
          <div className="SignupForm-field">
            <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
          </div>
          <div className="SignupForm-btns">
            <button className="signup-btn" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
            <button className="signup-btn"><Link className="cancel-link" to='/'>Cancel</Link></button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;