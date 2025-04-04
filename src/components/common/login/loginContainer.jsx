// src/containers/LoginContainer.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginView from './loginView';
import { login,register } from '../../../store/auth/authActions';

class LoginContainer extends Component {
  handleLogin = (email,password) => {
   this.props.login(email,password);
  };

  handleRegister =(name,email,password)=>
  {
    this.props.register(name,email,password);
  }

  render() {
    return (
      <LoginView
        onLogin={this.handleLogin}
        onSignup={this.handleRegister}
        auth={this.props.auth}
        loading={this.props.loading}
      />
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ login,register}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
