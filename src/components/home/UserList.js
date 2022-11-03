import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../../firebaseConfig";
import auth from "../../firebaseConfig";

export default function UserList() {
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let usersArr = [];

      snapshot.forEach((user) => {
        if (user.key !== auth.currentUser.uid) {
          usersArr.push(user.val());
        }
      });

      setUserLists(usersArr);
    });
  }, []);

  return (
    <>
      {/* UserList  Start */}
      <div className="shadow-xl p-4 h-[365px] overflow-y-scroll">
        <div className="flex justify-between mb-2">
          <h2 className="text-black text-xl font-bold">User List</h2>
          <BiDotsVerticalRounded className="text-green-600 text-2xl cursor-pointer" />
        </div>

        {/* Single User List Start */}

        {userLists.map((user, index) => (
          <div
            key={index}
            className={`flex justify-between items-center border-b border-solid border-gray-300 py-2 ${
              index === userLists.length - 1 && "border-b-0"
            }`}
          >
            <img
              src={user.profile_picture}
              alt=""
              className="h-[50px] w-[50px] mr-3"
            />
            <div className="self-start grow">
              <h2 className="text-base font-bold">{user.username}</h2>
              <p className="text-sm text-gray-500">Hi guys, Whats up</p>
            </div>
            <p className="text-[10px] text-gray-400">Today: 9.00pm</p>
          </div>
        ))}
      </div>
    </>
  );
}
