import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "../MainLayout/MainLayout";
import { hasRoutePermission } from "../../utils/authUtils";
import auth from "./auth";

const RestrictedRoute = ({ component: Component, path, ...rest }) => {
  console.log("permissions",useSelector((state) => state.auth.loginUser))
  const { permissions } = useSelector((state) => state.auth.loginUser);

  console.log("permissions",permissions)
  const isAuthenticated = auth.isAuthenticated();
  
  console.log("is authenticated",isAuthenticated)
  const isAuthorized = hasRoutePermission(permissions, path);

  console.log("is authorized",isAuthorized)

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
