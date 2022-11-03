import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../firebaseConfig";

export default function Dashboard() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
