import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="max-w-container mx-auto">
      <div className="flex flex-col justify-center sm:w-[100%] sm:p-2 sml:w-[50%] sml:h-full md:h-screen">
        <form>
          <h2 className="sm:text-lg md:text-3xl font-bold text-green-500 mb-2">
            Login to your account
          </h2>

          <button className="flex border border-solid border-green-200 p-2 rounded my-4">
            <img src="./images/google.png" alt="" className="mr-2" />
            Login with google
          </button>

          <div className="mb-6">
            <label htmlFor="email" className=" text-sm bg-white text-gray-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-b border-solid border-gray-500 rounded py-4 focus:outline-none w-full"
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
            />
          </div>

          <button
            type="submit"
            className="bg-green-700 text-white block rounded-full text-lg w-full p-4 sml:mt-4 sml:p-2 md:mt-10 md:p-4 "
          >
            Login to Continue
          </button>

          <p className="mt-4">
            No have an account ?{" "}
            <Link to="/registration" className="text-yellow-500">
              Register
            </Link>
          </p>
        </form>
      </div>
      {/* Image File  */}
      <img
        src="./images/login.png"
        alt=""
        className="absolute right-0 top-0 h-screen sm:hidden sml:block sml:w-[300px] sml:h-full md:w-[350px] lg:w-[500px]"
      />
    </div>
  );
}
