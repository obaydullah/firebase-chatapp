import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import useAuthStatus from "../hooks/useAuthStatus";

const PrivateLogin = () => {
  //   const logedIn = true;

  const { logedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <h1>Loading ....</h1>;
  }

  return logedIn ? <Navigate to="/" /> : <Login />;
};

export default PrivateLogin;
