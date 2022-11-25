import React, { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ref, onValue, set, push, remove } from "firebase/database";
import { db } from "../../firebaseConfig";
import auth from "../../firebaseConfig";

export default function Friends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "friends/");
    onValue(usersRef, (snapshot) => {
      let friendsArr = [];

      snapshot.forEach((user) => {
        if (auth.currentUser.uid === user.val().senderid) {
          friendsArr.push({ ...user.val(), key: user.key });
        }
        if (auth.currentUser.uid === user.val().receiverid) {
          friendsArr.push({ ...user.val(), key: user.key });
        }
      });
      setFriends(friendsArr);
    });
  }, []);

  const handleBlock = (user) => {
    set(push(ref(db, "blockedlist/")), {
      blockedbyname: user.sendername,
      blockedbyid: user.senderid,
      blockedid: user.receiverid,
      blockedname: user.receivername,
      blockedphoto: user.receiverphoto,
      blockedbyphoto: user.senderphoto,
    }).then(() => {
      remove(ref(db, "friends/" + user.key));
    });

    set(push(ref(db, "notification")), {
      senderid: auth.currentUser.uid,
      receiverid: user.receiverid,
      message: `${user.receivername} is blocked by ${user.sendername}`,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()} - ${new Date().toLocaleTimeString()}`,
    });

    //Unreade notification
    const unReadRef = ref(db, "unread/");

    let tempCountValue = 0;

    onValue(unReadRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (item.key === user.receiverid) {
          tempCountValue = item.val().count;
        }
      });
    });

    set(ref(db, "unread/" + user.receiverid), {
      count: tempCountValue + 1,
    });
  };

  return (
    <>
      {/* Friends Start */}
      <div className="shadow-xl p-4 h-[365px] overflow-y-scroll">
        <div className="flex justify-between mb-2">
          <h2 className="text-black text-xl font-bold">Friends</h2>
          <BiDotsVerticalRounded className="text-green-600 text-2xl cursor-pointer" />
        </div>

        {/* Single Friend Start */}

        {friends.map((friend, index) => (
          <div
            key={index}
            className={`flex justify-between items-center border-b border-solid border-gray-300 py-2 ${
              index === friends.length - 1 && "border-b-0"
            }`}
          >
            <img
              src={
                (auth.currentUser.uid === friend.senderid &&
                  friend.receiverphoto) ||
                (auth.currentUser.uid === friend.receiverid &&
                  friend.senderphoto)
              }
              alt=""
              className="h-[50px] w-[50px] rounded-full"
            />
            <div>
              <h2 className="text-base font-bold">
                {(auth.currentUser.uid === friend.senderid &&
                  friend.receivername) ||
                  (auth.currentUser.uid === friend.receiverid &&
                    friend.sendername)}
              </h2>
              <p className="text-sm text-gray-500">Hi guys, Whats up</p>
            </div>

            {auth.currentUser.uid === friend.senderid ? (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded text-base"
                onClick={() => handleBlock(friend)}
              >
                Block
              </button>
            ) : (
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded text-base"
                disabled="true"
              >
                Block
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
