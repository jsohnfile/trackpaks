import React, { Component } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import './SignupPage.css';

class SignupPage extends Component {
  state = {message: ''}

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <div className='SignupPage'>
        <div className="SignupPage-container">
          <SignupForm {...this.props} updateMessage={this.updateMessage} />
          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}

export default SignupPage;