import React, { useState, useEffect } from "react";
import { BiDotsVerticalRounded, BiMessageAdd } from "react-icons/bi";
import auth from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { activeChat } from "../../features/activeChat/activeChatSlice";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const dispatch = useDispatch();

  const activeChatData = useSelector((state) => state.activeChat);

  useEffect(() => {
    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((user) => {
        if (
          user.val().senderid === auth.currentUser.uid ||
          user.val().receiverid === auth.currentUser.uid
        ) {
          arr.push(user.val());
        }
      });

      setFriends(arr);
    });
  }, []);

  const {
    receiverid,
    receiverphoto,
    senderid,
    senderphoto,
    status,
    receivername,
    sendername,
  } = activeChatData.value;

  const handleSingleChat = (friend) => {
    dispatch(
      activeChat({
        senderid: auth.currentUser.uid,
        sendername: auth.currentUser.displayName,
        receiverid:
          auth.currentUser.uid === friend.senderid
            ? friend.receiverid
            : friend.senderid,
        receivername:
          auth.currentUser.uid === friend.senderid
            ? friend.receivername
            : friend.sendername,
        photo:
          auth.currentUser.uid === friend.senderid
            ? friend.receiverphoto
            : friend.senderphoto,
      })
    );
  };

  return (
    <div className="shadow-xl p-4 h-[48vh] overflow-y-scroll">
      <div className="flex justify-between mb-2">
        <h2 className="text-black text-xl font-bold">Friends</h2>
        <BiDotsVerticalRounded className="text-green-600 text-2xl cursor-pointer" />
      </div>
      {/* Single Friend Start */}
      {friends.map((friend, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b border-solid border-gray-300 py-2 "
        >
          <img
            src={
              auth.currentUser.uid === friend.senderid
                ? friend.receiverphoto
                : friend.senderphoto
            }
            alt=""
            className="h-[50px] w-[50px] rounded-full"
          />
          <div className="mr-auto ml-2">
            <h2 className="text-base font-bold">
              {auth.currentUser.uid === friend.senderid
                ? friend.receivername
                : friend.sendername}
            </h2>
            <p className="text-sm text-gray-500">Hi guys, Whats up</p>
          </div>

          <div
            className="bg-green-600 text-white p-4 px-6 rounded cursor-pointer"
            onClick={() => handleSingleChat(friend)}
          >
            <BiMessageAdd />
          </div>
        </div>
      ))}
    </div>
  );
}
