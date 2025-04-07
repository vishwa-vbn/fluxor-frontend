import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { Store } from "react-notifications-component";

import { hideAlert } from "../../../store/alert/alertActions";
import "animate.css"; // Make sure animate.css is imported

class AlertView extends React.PureComponent {
  render() {
    const { isOpen, title, msg, type, hideAlert } = this.props;

    if (isOpen) {
      Store.addNotification({
        title: title,
        message: msg,
        type: type,
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeInRight"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });

      hideAlert();
    }

    return null;
  }
}

AlertView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  msg: PropTypes.string,
  type: PropTypes.string,
  hideAlert: PropTypes.func.isRequired,
};

const mapStateToProps = ({ alert: { isOpen, title, msg, type } }) => ({
  isOpen,
  title,
  msg,
  type,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      hideAlert,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AlertView);
