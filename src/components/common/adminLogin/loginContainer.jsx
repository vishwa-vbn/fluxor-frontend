import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AdminAuthView from "./loginView";
import {
  login,
  forgotPassword,
  registerAdmin,
} from "../../../store/auth/authActions";

class AdminLoginContainer extends Component {
  handleLogin = (email, password) => {
    this.props.login(email, password);
  };

  handleRegister = (username, email, password) => {
    this.props.registerAdmin(
      username,
      email,
      password,
    );
  };

  handleForgotPassword = (email) => {
    this.props.forgotPassword(email);
  };

  render() {
    return (
      <AdminAuthView
        onLogin={this.handleLogin}
        onSignup={this.handleRegister}
        onForgotPassword={this.handleForgotPassword}
        loading={this.props.loading}
        auth={this.props.auth}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.auth.authPending,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login,
      forgotPassword,
      registerAdmin,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginContainer);
