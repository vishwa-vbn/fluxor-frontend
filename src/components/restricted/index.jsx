import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "../MainLayout/MainLayout";
import { hasRoutePermission } from "../../utils/authUtils";
import auth from "./auth";

const RestrictedRoute = ({ component: Component, path, ...rest }) => {

  const isAuthenticated = auth.isAuthenticated();
  

  const { permissions } = useSelector((state) => state.auth.loginUser);
  const isAuthorized = hasRoutePermission(permissions, path);




  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          isAuthorized ? (
            <MainLayout>
              <Component {...props} />
            </MainLayout>
          ) : (
            <Redirect to="/unauthorized" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default RestrictedRoute;
