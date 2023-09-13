import { Navigate } from "react-router-dom";
import React from "react";
import { isTokenExpired } from "../../utils/helpers";

const AuthRouteGuard = ({ children }) => {
  if (isTokenExpired()) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default AuthRouteGuard;
