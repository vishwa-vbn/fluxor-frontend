// src/containers/LoginContainer.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginView from "./loginView";
import {
  forgotPassword,
  login,
  register,
} from "../../../store/auth/authActions";

class LoginContainer extends Component {
  handleLogin = (email, password) => {
    this.props.login(email, password);
  };

  handleRegister = (name, email, password) => {
    this.props.register(name, email, password);
  };
  handleForgotPassword = (email) => {
    this.props.forgotPassword(email);
  };

  render() {
    return (
      <LoginView
        onLogin={this.handleLogin}
        onSignup={this.handleRegister}
        onForgotPassword={this.handleForgotPassword}
        auth={this.props.auth}
        loading={this.props.loading}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ login, register, forgotPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
