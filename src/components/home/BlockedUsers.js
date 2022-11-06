import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ref, onValue, set, update, push, remove } from "firebase/database";
import { db } from "../../firebaseConfig";
import auth from "../../firebaseConfig";

export default function BlockedUsers() {
  const [blockedList, setBlockedList] = useState([]);

  useEffect(() => {
    const blockedRef = ref(db, "blockedlist/");
    onValue(blockedRef, (snapshot) => {
      let blockedArr = [];

      snapshot.forEach((user) => {
        blockedArr.push({ ...user.val(), key: user.key });
      });

      setBlockedList(blockedArr);
    });
  }, []);

  const handleUnblock = (user) => {
    console.log(user);
    set(push(ref(db, "friends/")), {
      sendername: user.blockedbyname,
      senderid: user.blockedbyid,
      receiverid: user.blockedid,
      receivername: user.blockedname,
      receiverphoto: user.blockedphoto,
      senderphoto: user.blockedbyphoto,
    }).then(() => {
      remove(ref(db, "blockedlist/" + user.key));
    });
  };

  return (
    <>
      {/* Friends Start */}
      <div className="shadow-xl p-4 h-[365px] overflow-y-scroll">
        <div className="flex justify-between mb-2">
          <h2 className="text-black text-xl font-bold">Blocked Users</h2>
          <BiDotsVerticalRounded className="text-green-600 text-2xl cursor-pointer" />
        </div>

        {/* Single Friend Start */}

        {blockedList.map((user, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-solid border-gray-300 py-2"
          >
            <img
              src={user.blockedphoto}
              alt=""
              className="h-[50px] w-[50px] rounded-full"
            />
            <div>
              <h2 className="text-base font-bold">{user.blockedname}</h2>
              <p className="text-sm text-gray-500">Hi guys, Whats up</p>
            </div>

            {auth.currentUser.uid === user.blockedid ? (
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded text-base"
                disabled="true"
              >
                Unblock
              </button>
            ) : (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded text-base"
                onClick={() => handleUnblock(user)}
              >
                Unblock
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
