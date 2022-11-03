import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { PulseLoader } from "react-spinners";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { set, ref } from "firebase/database";
import auth from "../../firebaseConfig";
import { db } from "../../firebaseConfig";

export default function Registration() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [fullNameErr, setFullNameErr] = useState("");

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShowPass = () => {
    setShowPass((prevState) => {
      return !prevState;
    });
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    setEmailError("");
    setPassError("");
    setFullNameErr("");

    //Form Validation Start

    if (fullName.trim().length <= 3) {
      setFullNameErr("Full Name should be grater than 3");
    }
    if (!email) {
      setEmailError("Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError("Email is not valid");
      }
    }
    if (password.trim().length <= 4) {
      setPassError("Password length should be grater than 4");
    }

    // Firebase Login with Email and Password

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: fullName,
          photoURL: "./images/profile-pic.png",
        })
          .then(() => {
            sendEmailVerification(auth.currentUser)
              .then(() => {
                setLoading(false);
                setSuccess(
                  "Registration Successfull, please verify your email to continue"
                );
              })
              .then(() => {
                const { displayName, email, photoURL, uid } =
                  userCredential.user;

                set(ref(db, "users/" + uid), {
                  username: displayName,
                  email: email,
                  profile_picture: photoURL,
                });

                setTimeout(() => {
                  return navigate("/login");
                }, 3000);
              });
          })
          .catch((error) => {});
      })
      .catch((error) => {
        setLoading(false);

        const errorCode = error.code;
        if (errorCode.includes("auth/email-already-in-use")) {
          setEmailError("Email is already in use");
        }
      });
  };

  return (
    <div className="max-w-container mx-auto">
      <div className="flex flex-col justify-center sm:w-[100%] sm:p-2 sml:w-[50%] sml:h-full md:h-screen">
        <form onSubmit={handleRegistration}>
          <h2 className="sm:text-lg md:text-3xl font-bold text-green-500 mb-2">
            Get easily with easily Register
          </h2>
          <p className="sm:text-[12px] sm:mb-4 md:text-sm text-gray-500 md:mb-8">
            Free register and you can enjoy it{" "}
          </p>

          {success ? (
            <p className="mt-1 text-sm bg-green-500 text-white p-1 mb-6">
              {success}
            </p>
          ) : (
            ""
          )}

          <div className="mb-6 relative">
            <label
              htmlFor="email"
              className=" text-sm absolute -top-3 left-4 bg-white px-4"
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              id="email"
              className="border border-solid border-gray-500 rounded px-7 py-4 focus:outline-none w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError ? (
              <p className="mt-1 text-sm bg-red-500 text-white p-1">
                {emailError}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="fullname"
              className=" text-sm absolute -top-3 left-4 bg-white px-4"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="border border-solid border-gray-500 rounded px-7 py-4 focus:outline-none w-full"
              onChange={(e) => setFullName(e.target.value)}
            />
            {fullNameErr ? (
              <p className="mt-1 text-sm bg-red-500 text-white p-1">
                {fullNameErr}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className=" text-sm absolute -top-3 left-4 bg-white px-4"
            >
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              className="border border-solid border-gray-500 rounded px-7 py-4 focus:outline-none w-full"
              onChange={(e) => setPassword(e.target.value)}
            />

            {showPass ? (
              <AiFillEye
                className="absolute top-5 right-4 text-lg cursor-pointer"
                onClick={handleShowPass}
              />
            ) : (
              <BsFillEyeSlashFill
                className="absolute top-5 right-4 text-lg cursor-pointer"
                onClick={handleShowPass}
              />
            )}

            {passError ? (
              <p className="mt-1 text-sm bg-red-500 text-white p-1">
                {passError}
              </p>
            ) : (
              ""
            )}
          </div>

          {loading ? (
            <PulseLoader color="green" className="text-center text-green-600" />
          ) : (
            <button
              onClick={handleRegistration}
              type="submit"
              className="bg-green-700 text-white block rounded-full text-lg w-full p-4 sml:mt-4 sml:p-2 md:mt-6 md:p-4"
            >
              Sign up
            </button>
          )}

          <p className="mt-4">
            Already have an account ?{" "}
            <Link to="/login" className="text-yellow-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
      {/* Image File  */}
      <img
        src="./images/registration.png"
        alt=""
        className="absolute right-0 top-0 h-screen sm:hidden sml:block sml:w-[300px] sml:h-full md:w-[350px] lg:w-[500px]"
      />
    </div>
  );
}
