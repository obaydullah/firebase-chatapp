import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrFacebookOption } from "react-icons/gr";
import { PulseLoader } from "react-spinners";
import auth from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [forgotEmail, setForgotEmail] = useState("");

  const [success, setSuccess] = useState("");
  const [forgotPassSuccess, setForgotPassSuccess] = useState("");
  const [error, setError] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password is required");
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess("Login Successfull, we are taking you to Home Page");

        toast("Login Successfull");

        //Black email password and error after sign in
        setEmail("");
        setPassword("");
        setError("");

        setTimeout(() => {
          setLoading(false);
          return navigate("/");
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);

        const errorCode = error.code;
        if (errorCode.includes("wrong-password")) {
          setError("Wrong email and password");
        }
        if (errorCode.includes("user-not-found")) {
          setError("Wrong email and password");
        }
        if (errorCode.includes("network-request-failed")) {
          setError("Network Error");
        }
      });
  };

  const googleprovider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleprovider)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {});
  };

  const fbprovider = new FacebookAuthProvider();

  const handleFacebookLogin = () => {
    signInWithPopup(auth, fbprovider)
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes("account-exists-with-different-credential")) {
          setError("Your facebook gmail is already used");
        }
        if (errorMessage.includes("internal-error")) {
          setError("Internal Error");
        }
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, forgotEmail)
      .then(() => {
        setForgotError("");
        setForgotPassSuccess("Password reset link sent successfully");
        setTimeout(() => {
          setShow(false);
          setForgotError("");
          setForgotPassSuccess("");
        }, 3000);
      })
      .catch((error) => {
        setForgotPassSuccess("");

        const errorCode = error.code;
        if (errorCode.includes("user-not-found")) {
          setForgotError("Email is not exists");
        }
        if (errorCode.includes("missing-email")) {
          setForgotError("Email is required");
        }
      });
  };

  const handleModalShow = () => {
    setShow((prevState) => {
      return !prevState;
    });
  };

  const handleModalClose = (e) => {
    if (e.target.className.includes("close-div")) {
      setShow(false);
    }
  };

  return (
    <div className="max-w-container mx-auto">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="flex flex-col justify-center sm:w-[100%] sm:p-2 sml:w-[50%] sml:h-full md:h-screen">
        <h2 className="sm:text-lg md:text-3xl font-bold text-green-500 mb-2">
          Login to your account
        </h2>

        <div className="my-4 flex flex-wrap justify-between">
          <button
            className="flex border border-solid border-green-200 p-2 rounded "
            onClick={handleGoogleLogin}
          >
            <img src="./images/google.png" alt="" className="mr-2" />
            Login with google
          </button>
          <button
            className="flex border border-solid border-green-200 p-2 rounded"
            onClick={handleFacebookLogin}
          >
            <GrFacebookOption className="text-2xl text-blue-700" />
            Login with Facebook
          </button>
        </div>

        {success ? (
          <p className="mt-1 text-sm bg-green-500 text-white p-1 mb-6">
            {success}
          </p>
        ) : (
          ""
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className=" text-sm bg-white text-gray-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-b border-solid border-gray-500 rounded py-4 focus:outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className=" text-sm bg-white text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-b border-solid border-gray-500 rounded py-4 focus:outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {loading ? (
            <PulseLoader color="green" className="text-center text-green-600" />
          ) : (
            <button
              type="submit"
              className="bg-green-700 text-white block rounded-full text-lg w-full p-4 sml:mt-4 sml:p-2 md:mt-10 md:p-4 md:mb-4 "
              onClick={handleLogin}
            >
              Login to Continue
            </button>
          )}

          {error ? (
            <p className="mt-1 text-base bg-red-500 text-white text-center">
              {error}
            </p>
          ) : (
            ""
          )}

          <p className="mt-4">
            No have an account ?{" "}
            <Link to="/registration" className="text-yellow-500">
              Register
            </Link>
          </p>
        </form>

        <h4
          className="text-red-600 text-center mt-4 cursor-pointer"
          onClick={handleModalShow}
        >
          Forgot Password ?{" "}
        </h4>
      </div>
      {/* Image File  */}
      <img
        src="./images/login.png"
        alt=""
        className="absolute right-0 top-0 h-screen sm:hidden sml:block sml:w-[300px] sml:h-full md:w-[350px] lg:w-[500px]"
      />

      {/* Forgot Password Modal Start */}
      {show && (
        <div
          className="w-full h-screen bg-green-600/75 text-black flex justify-center items-center fixed top-0 left-0 close-div"
          onClick={handleModalClose}
        >
          <div className="bg-white rounded p-10 relative">
            <div className="absolute top-4 right-4 text-xl cursor-pointer p-2 w-12 close-div">
              <img src="./images/close.jpg" alt="" className="close-div" />
            </div>
            <form>
              <h2 className="text-green-600 text-xl font-bold mb-6">
                Forgot Password
              </h2>
              <input
                type="email"
                name="email"
                id="email"
                className="border-b border-solid border-gray-500 rounded py-4 focus:outline-none w-[300px]"
                placeholder="Email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />

              {forgotError ? (
                <p className="mt-1 text-sm bg-red-500 text-white p-1 mb-6">
                  {forgotError}
                </p>
              ) : (
                ""
              )}
              {forgotPassSuccess ? (
                <p className="mt-1 text-sm bg-green-500 text-white p-1 mb-6">
                  {forgotPassSuccess}
                </p>
              ) : (
                ""
              )}

              <button
                type="submit"
                className="bg-green-700 text-white block rounded-full text-lg w-full p-4 mt-4"
                onClick={handleForgotPassword}
              >
                Forgot Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
