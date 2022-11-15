import React, { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import auth from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { ref, set, push, onValue } from "firebase/database";

export default function Chat() {
  const activeChatData = useSelector((state) => state.activeChat);

  const [msg, setMsg] = useState("");
  const [singleChat, setSingleChat] = useState([]);

  const {
    receiverid,
    receiverphoto,
    senderid,
    senderphoto,
    status,
    receivername,
    sendername,
    photo,
  } = activeChatData.value;

  const handleSubmit = (e) => {
    e.preventDefault();
    set(push(ref(db, "singlechat/")), {
      msg: msg,
      senderid: auth.currentUser.uid,
      sendername: sendername,
      receiverid: receiverid,
      receivername: receivername,
    });
    setMsg("");
  };

  useEffect(() => {
    const singleChatRef = ref(db, "singlechat/");
    onValue(singleChatRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((user) => {
        if (
          user.val().senderid === senderid &&
          user.val().receiverid === receiverid
        ) {
          arr.push(user.val());
        }
        if (
          user.val().senderid === receiverid &&
          user.val().receiverid === senderid
        ) {
          arr.push(user.val());
        }
      });

      setSingleChat(arr);
    });
  }, [receiverid]);

  console.log(auth.currentUser.uid);

  return (
    <div className="h-full grow border shadow-lg px-10">
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-center border-b border-solid border-gray-300 py-4">
          <img
            src={photo}
            className="h-[70px] w-[70px] rounded-full shadow-lg"
            alt="photo"
          />
          <div className="mr-auto ml-6">
            <h2 className="text-2xl font-bold">
              {auth.currentUser.uid === senderid ? receivername : sendername}
            </h2>
            <p className="text-sm text-gray-700">Online</p>
          </div>
          <BiDotsVerticalRounded className="cursor-pointer text-2xl" />
        </div>

        {status === "single" ? (
          <div className="mb-auto mt-4 overflow-y-scroll">
            {singleChat.map((chat, index) => (
              <div key={index} className="text-left mt-2">
                <p className="text-base bg-gray-200 inline-block p-2 rounded">
                  {chat.msg}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-auto mt-4">
            <div className="text-left mt-2">
              <p className="text-base bg-gray-200 inline-block p-2 rounded">
                Group
              </p>
            </div>
            <div className="text-right mt-2">
              <p className="text-base bg-green-600 text-white inline-block p-2 rounded">
                Group
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center border-t border-solid border-gray-300 py-4">
          <form className="flex justify-between w-full" onSubmit={handleSubmit}>
            <div className="w-full relative">
              <input
                type="text"
                name=""
                id=""
                placeholder="Type here....."
                className="w-full focus:outline-none bg-gray-300 rounded px-4 p-2 pr-16"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />

              <div className="absolute top-[50%] right-2 -translate-y-1/2 flex gap-2">
                <BsEmojiSmile className="cursor-pointer" />
                <AiOutlineCamera className="cursor-pointer text-lg" />
              </div>
            </div>
            <div
              className="bg-green-600 text-white cursor-pointer p-2 rounded ml-4"
              onClick={handleSubmit}
            >
              <IoMdSend className="text-2xl" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
