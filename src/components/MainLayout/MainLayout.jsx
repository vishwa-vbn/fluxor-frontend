import React from "react";
import PropTypes from "prop-types";
// import { Header, Footer, Sidebar, TopNavBar } from "../common";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
// import { logout } from "../../store/auth/authActions";

class MainLayout extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <TopNavBar />
        <main className="flex-grow container mx-auto px-4 py-6">
          {this.props.children}
        </main>
       
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object.isRequired,
  getState: PropTypes.func.isRequired,
  stateLoaded: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logout: logout,
    },
    dispatch
  );

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
