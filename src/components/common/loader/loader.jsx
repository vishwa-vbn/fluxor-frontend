import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import clsx from "clsx";
import "./loaderStyles.css"; // Import the CSS file

const Loader = ({ isOpen, size, message, className }) => {
  if (!isOpen) return null;

  return (
    <div
      className={clsx("loader-overlay", {
        "pointer-events-none": !isOpen, // Optional: prevents interaction when not open
      })}
    >
      <div className={clsx("loader-content", className)}>
        <span className={`loading loading-bars loading-${size}`}></span>
        {message && <p className="loader-message">{message}</p>}
      </div>
    </div>
  );
};

Loader.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  message: PropTypes.string,
  className: PropTypes.string,
};

Loader.defaultProps = {
  size: "md",
  message: "Loading, please wait...",
  className: "",
};

const mapStateToProps = (state) => (
  console.log("redux state in loader", state),
  {
    isOpen: state.loader.isOpen,
  }
);

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Loader);