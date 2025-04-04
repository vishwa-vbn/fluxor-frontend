import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import auth from "./auth";
import MainLayout from "../MainLayout/MainLayout";
const RestrictedRoute = ({ component: Component, path, ...rest }) => {
  return (
    // <Route
    //   {...rest}
    //   render={(props) => {
    //     return (
    //       <div>
    //         <TopNavBar />

    //         <Component {...props} />
    //       </div>
    //     );
    //   }}
    // />

    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return (
            // <div className="page_content_wrapper">
            //   <Sidebar />
            //   <SideBarMobile />
            //   <Header label={"Home Screen"} Icon={IoFastFood} />
            //   <Component {...props} />

            // </div>
            <MainLayout>
              <Component {...props} />
            </MainLayout>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(RestrictedRoute));
