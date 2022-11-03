import React from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import useAuthStatus from "../hooks/useAuthStatus";

const PrivateRoute = () => {
  //   const logedIn = true;

  const { logedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <h1>Loading ....</h1>;
  }

  return logedIn ? <Dashboard /> : <Navigate to="/login" />;
};

export default PrivateRoute;
