import React from "react";
import { Link } from "react-router-dom";

export default function VerifyYourEmail() {
  return (
    <>
      <h2 className="text-4xl bg-green-600 text-white">
        Please Verify your email to continue
      </h2>
      <Link className="text-pink-600 text-lg" to="/">
        Go to Login page
      </Link>
    </>
  );
}
