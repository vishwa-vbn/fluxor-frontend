// containers/ResetPasswordContainer.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { resetPassword } from "../../../store/auth/authActions"; // Path depends on your setup
import ResetPassword from "./resetPasswordView";

class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    const token = new URLSearchParams(window.location.search).get("token");

    if (!password || !confirmPassword) {
      this.setState({ error: "Please fill out all fields." });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match." });
      return;
    }

    this.props.resetPassword(password, token);
  };

  render() {
    return (
      <ResetPassword
        password={this.state.password}
        confirmPassword={this.state.confirmPassword}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        error={this.state.error}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      resetPassword,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordContainer);
