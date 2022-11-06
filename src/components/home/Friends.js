import React, { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ref, onValue, set } from "firebase/database";
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
          friendsArr.push(user.val());
        }
        if (auth.currentUser.uid === user.val().receiverid) {
          friendsArr.push(user.val());
        }
      });

      setFriends(friendsArr);
    });
  }, []);

  //Decide What to render in Friends Name
  let friendsName;

  friends.map((fr) => {
    if (auth.currentUser.uid === fr.senderid) {
      friendsName = fr.receivername;
    }
    if (auth.currentUser.uid === fr.receiverid) {
      friendsName = fr.sendername;
    }
    return friendsName;
  });

  //Decide What to render in Friends Image
  let friendsImage;

  friends.map((fr) => {
    if (auth.currentUser.uid === fr.senderid) {
      friendsImage = fr.receiverphoto;
    }
    if (auth.currentUser.uid === fr.receiverid) {
      friendsImage = fr.senderphoto;
    }
    return friendsImage;
  });

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
              src={friendsImage}
              alt=""
              className="h-[50px] w-[50px] rounded-full"
            />
            <div>
              <h2 className="text-base font-bold">{friendsName}</h2>
              <p className="text-sm text-gray-500">Hi guys, Whats up</p>
            </div>

            <button className="bg-green-600 text-white px-4 py-2 rounded text-base">
              Block
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
