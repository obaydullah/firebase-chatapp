import React, { useEffect, useState } from "react";
import {
  AiOutlineHome,
  AiFillMessage,
  AiFillSetting,
  AiFillNotification,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebaseConfig";

export default function Sidebar() {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [profilePhotoURL, setProfilePhotoURL] = useState("");

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        setProfilePhotoURL(user.photoURL);
      }
    });
  }, [auth, profilePhotoURL]);

  return (
    <div className=" bg-green-600 text-white p-4 sm:fixed sm:left-0 sm:bottom-0 sm:w-screen sm:h-[55px] sml:w-[186px] sml:static sml:h-auto">
      <div className="h-full flex gap-12 sm:flex-row sml:flex-col sm:justify-between sml:justify-start">
        <div className="flex flex-col items-center">
          <img
            src={profilePhotoURL}
            alt=""
            className="mb-2 sm:h-[50px] sm:w-[50px] sm:-mt-4 sml:h-[70px] sml:w-[70px] sml:mt-4 rounded-full"
          />
          <h3 className="text-center"> {userName}</h3>
        </div>
        <div className="flex items-center sm:text-2xl sml:text-4xl sm:flex-row sml:flex-col">
          <NavLink
            end
            to="/"
            className={({ isActive, isPending }) =>
              isActive
                ? "bg-white text-green-600 w-full flex justify-center rounded py-3 mb-4 cursor-pointer relative after:absolute after:h-full after:w-[5%] after:top-0 after:right-0 after:content-[''] after:bg-green-600 after:rounded-tl-lg after:rounded-bl-lg p-2 sml:p-4"
                : isPending
                ? "pending"
                : "w-full flex justify-center py-3 mb-4 cursor-pointer p-2"
            }
          >
            <AiOutlineHome />
          </NavLink>

          <NavLink
            to="message"
            className={({ isActive, isPending }) =>
              isActive
                ? "bg-white text-green-600 w-full flex justify-center rounded py-3 mb-4 cursor-pointer relative after:absolute after:h-full after:w-[5%] after:top-0 after:right-0 after:content-[''] after:bg-green-600 after:rounded-tl-lg after:rounded-bl-lg p-2 sml:p-4"
                : isPending
                ? "pending"
                : "w-full flex justify-center py-3 mb-4 cursor-pointer p-2"
            }
          >
            <AiFillMessage />
          </NavLink>

          <NavLink
            to="notification"
            className={({ isActive, isPending }) =>
              isActive
                ? "bg-white text-green-600 w-full flex justify-center rounded py-3 mb-4 cursor-pointer relative after:absolute after:h-full after:w-[5%] after:top-0 after:right-0 after:content-[''] after:bg-green-600 after:rounded-tl-lg after:rounded-bl-lg p-2 sml:p-4"
                : isPending
                ? "pending"
                : "w-full flex justify-center py-3 mb-4 cursor-pointer p-2"
            }
          >
            <AiFillNotification />
          </NavLink>

          <NavLink
            to="settings"
            className={({ isActive, isPending }) =>
              isActive
                ? "bg-white text-green-600 w-full flex justify-center rounded py-3 mb-4 cursor-pointer relative after:absolute after:h-full after:w-[5%] after:top-0 after:right-0 after:content-[''] after:bg-green-600 after:rounded-tl-lg after:rounded-bl-lg p-2 sml:p-4"
                : isPending
                ? "pending"
                : "w-full flex justify-center py-3 mb-4 cursor-pointer p-2"
            }
          >
            <AiFillSetting />
          </NavLink>
        </div>

        <div className="mx-auto mb-4 cursor-pointer sm:justify-center sm:mr-4 sm:text-2xl sml:mr-auto sml:text-4xl">
          <FiLogOut onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

// " bg-white text-green-600 w-full flex justify-center rounded py-3 mb-4 cursor-pointer relative after:absolute after:h-full after:w-[5%] after:top-0 after:right-0 after:content-[''] after:bg-green-600 after:rounded-tl-lg after:rounded-bl-lg"
