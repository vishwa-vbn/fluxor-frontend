import React from "react";
import PropTypes from "prop-types";
// import { Header, Footer, Sidebar, TopNavBar } from "../common";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
// import { logout } from "../../store/auth/authActions";
import AdminSidebar from "../common/adminsidebar/adminsidebar";

import "./MainLayout.css";
import { logout } from "../../store/auth/authActions";

class MainLayout extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className=" w-screen h-screen flex flex-row items-center min-h-screen bg-gray-100">
        <AdminSidebar logout={this.props.logout} />

        <main className="h-screen w-screen overflow-auto scrollbar-hide">
          {this.props.children}
        </main>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ logout }, dispatch);

export default connect(null, mapDispatchToProps)(MainLayout);
