import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/Login" replace state={{ from: props.location }} />
  );
};

export default PrivateRoute;
