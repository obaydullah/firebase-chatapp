import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ref, onValue, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebaseConfig";
import auth from "../../firebaseConfig";

export default function UserList() {
  const [userLists, setUserLists] = useState([]);
  const [pendingStr, setPendingStr] = useState("");
  const [friendStr, setFriendStr] = useState("");
  const [blockedStr, setBlockedStr] = useState("");
  const [currentUserPhoto, setCurrentUserPhoto] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserPhoto(user.photoURL);
      }
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let usersArr = [];

      snapshot.forEach((user) => {
        if (user.key !== auth.currentUser.uid) {
          usersArr.push({ ...user.val(), id: user.key });
        }
      });

      setUserLists(usersArr);
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "friendrequest/");
    onValue(usersRef, (snapshot) => {
      let pendingString = "";

      snapshot.forEach((user) => {
        if (auth.currentUser.uid === user.val().senderid) {
          pendingString += user.val().senderid + user.val().receiverid;
        }
        if (auth.currentUser.uid === user.val().receiverid) {
          pendingString += user.val().receiverid + user.val().senderid;
        }
      });

      setPendingStr(pendingString);
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "friends/");
    onValue(usersRef, (snapshot) => {
      let friendStr = "";

      snapshot.forEach((user) => {
        if (auth.currentUser.uid === user.val().senderid) {
          friendStr += user.val().senderid + user.val().receiverid;
        }
        if (auth.currentUser.uid === user.val().receiverid) {
          friendStr += user.val().receiverid + user.val().senderid;
        }
      });

      setFriendStr(friendStr);
    });
  }, []);

  useEffect(() => {
    const blockedRef = ref(db, "blockedlist/");
    onValue(blockedRef, (snapshot) => {
      let blockedString = "";

      snapshot.forEach((user) => {
        if (auth.currentUser.uid === user.val().blockedbyid) {
          blockedString += user.val().blockedbyid + user.val().blockedid;
        }
        if (auth.currentUser.uid === user.val().blockedid) {
          blockedString += user.val().blockedid + user.val().blockedbyid;
        }
      });

      setBlockedStr(blockedString);
    });
  }, []);

  const handleFriendReq = (user) => {
    set(ref(db, "friendrequest/" + user.id), {
      sendername: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      receiverid: user.id,
      receivername: user.username,
      id: user.id,
      receiverphoto: user.profile_picture,
      senderphoto: currentUserPhoto,
    });
  };

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
              className="h-[50px] w-[50px] mr-3 rounded-full"
            />
            <div className="self-start grow">
              <h2 className="text-base font-bold">{user.username}</h2>
              <p className="text-sm text-gray-500">Hi guys, Whats up</p>
            </div>

            {pendingStr.includes(auth.currentUser.uid + user.id) ? (
              <button className="bg-green-600 text-white p-2 rounded text-sm">
                Pending
              </button>
            ) : friendStr.includes(auth.currentUser.uid + user.id) ? (
              <button className="bg-green-600 text-white p-2 rounded text-sm">
                Friend
              </button>
            ) : blockedStr.includes(auth.currentUser.uid + user.id) ? (
              <button className="bg-green-600 text-white p-2 rounded text-sm">
                Blocked
              </button>
            ) : (
              <button
                className="bg-green-600 text-white p-2 rounded text-sm"
                onClick={() => handleFriendReq(user)}
              >
                Send request
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
