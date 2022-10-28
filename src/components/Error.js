import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
      <h1 className="bg-red-500 text-white">
        There is nothing found in this route
      </h1>
      <Link to="/">Go to home page</Link>
    </>
  );
}
