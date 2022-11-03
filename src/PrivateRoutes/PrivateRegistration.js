import React from "react";
import { Navigate } from "react-router-dom";
import Registration from "../pages/Registration";
import useAuthStatus from "../hooks/useAuthStatus";

const PrivateRegistration = () => {
  //   const logedIn = true;

  const { logedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <h1>Loading ....</h1>;
  }

  return logedIn ? <Navigate to="/" /> : <Registration />;
};

export default PrivateRegistration;
