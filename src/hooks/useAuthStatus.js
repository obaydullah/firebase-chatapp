import React, { useState, useEffect } from "react";
import auth from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
  const [logedIn, setLogedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (
          user.emailVerified == true ||
          user.providerData[0].providerId.includes("facebook")
        ) {
          setLogedIn(true);
        }
      }
      setCheckingStatus(false);
    });
  }, []);

  return { logedIn, checkingStatus };
};

export default useAuthStatus;
