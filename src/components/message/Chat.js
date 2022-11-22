import React, { useState, useEffect, useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import auth from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { ref, set, push, onValue } from "firebase/database";
import moment from "moment";
import "./emojiStyle.css";

import Picker from "emoji-picker-react";

moment.locale("en");

export default function Chat() {
  const activeChatData = useSelector((state) => state.activeChat);

  const [chosenEmoji, setChosenEmoji] = useState("");
  const [emojiShow, setEmojiShow] = useState(false);

  const [msg, setMsg] = useState("");
  const [singleChat, setSingleChat] = useState([]);
  const [gorupChat, setGroupChat] = useState([]);
  const [chatPhoto, setchatPhoto] = useState("");

  //Refarance
  let chatAreaRef = useRef();

  const { receiverid, senderid, receivername, sendername, photo } =
    activeChatData.value;

  const { adminid, adminname, groupTagline, groupTitle, groupimage, groupkey } =
    activeChatData.group;

  const { status } = activeChatData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "single") {
      set(push(ref(db, "singlechat/")), {
        msg: msg,
        photo: chatPhoto,
        senderid: auth.currentUser.uid,
        sendername: sendername,
        receiverid: receiverid,
        receivername: receivername,
        emoji: chosenEmoji,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
      setMsg("");
      setchatPhoto("");
      setChosenEmoji("");
      setEmojiShow(false);
    } else {
      set(push(ref(db, "groupchat/")), {
        msg: msg,
        photo: chatPhoto,
        adminid,
        adminname,
        groupTagline,
        groupTitle,
        groupimage,
        emoji: chosenEmoji,
        senderid: auth.currentUser.uid,
        groupkey,
        members: activeChatData?.group?.members || [],
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
      setMsg("");
      setchatPhoto("");
      setChosenEmoji("");
      setEmojiShow(false);
    }

    let elem = chatAreaRef.current;
    let height = chatAreaRef.current.scrollHeight;

    elem.scrollTo({ top: height, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const singleChatRef = ref(db, "singlechat/");
    onValue(singleChatRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((user) => {
        if (
          (user.val().senderid === auth.currentUser.uid &&
            user.val().receiverid === receiverid) ||
          (user.val().senderid === receiverid &&
            user.val().receiverid === senderid)
        ) {
          arr.push(user.val());
        }
      });

      setSingleChat(arr);
    });
  }, [activeChatData.value, db, auth]);

  useEffect(() => {
    const groupChatRef = ref(db, "groupchat/");
    onValue(groupChatRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((chat) => {
        if (chat.val().groupkey === groupkey) {
          arr.push(chat.val());
        }
      });

      setGroupChat(arr);
    });
  }, [db, db, groupkey]);

  const handleSelectImage = (e) => {
    let files = e.target.files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      setchatPhoto(event.target.result);
    };
    reader.readAsDataURL(files);
  };

  const handleEmojiShow = () => {
    setEmojiShow((prevState) => {
      return !prevState;
    });
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(event.emoji);
  };

  return (
    <div className="h-full grow border shadow-lg px-10">
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-center border-b border-solid border-gray-300 py-4">
          <img
            src={photo || groupimage}
            className="h-[70px] w-[70px] rounded-full shadow-lg"
            alt="photo"
          />
          <div className="mr-auto ml-6">
            <h2 className="text-2xl font-bold">
              {auth.currentUser.uid === senderid
                ? receivername
                : sendername || groupTitle}
            </h2>
            <p className="text-sm text-gray-700">Online</p>
          </div>
          <BiDotsVerticalRounded className="cursor-pointer text-2xl" />
        </div>

        {status === "single" ? (
          <div className="mb-auto mt-4 overflow-y-scroll" ref={chatAreaRef}>
            {singleChat.map((chat, index) => (
              <div
                key={index}
                className={`text-left mt-2 flex flex-col items-start ${
                  auth.currentUser.uid === chat.senderid &&
                  "text-right items-end"
                }`}
              >
                {chat.msg !== "" && (
                  <p
                    className={`${
                      auth.currentUser.uid === chat.senderid
                        ? "text-white bg-green-600 inline-block p-2 rounded"
                        : "text-base bg-gray-200 inline-block p-2 rounded"
                    }`}
                  >
                    {chat.msg}
                  </p>
                )}

                {chat.photo && <img src={chat.photo} alt="" />}
                {chat.emoji && <p className="text-3xl">{chat.emoji}</p>}

                <p className="text-gray-500 inline-block rounded text-[12px]">
                  {moment(chat.date).fromNow()}
                </p>
              </div>
            ))}
            <br />
            <br />
            <br />
          </div>
        ) : (
          <div className="mb-auto mt-4 overflow-y-scroll" ref={chatAreaRef}>
            {gorupChat.map((chat, index) => (
              <div
                key={index}
                className={`text-left mt-2 flex flex-col items-start ${
                  auth.currentUser.uid === chat.senderid &&
                  "text-right items-end mr-2"
                }`}
              >
                {chat.msg !== "" && (
                  <p
                    className={`${
                      auth.currentUser.uid === chat.senderid
                        ? "text-white bg-green-600 inline-block p-2 rounded"
                        : "text-base bg-gray-200 inline-block p-2 rounded"
                    }`}
                  >
                    {chat.msg}
                  </p>
                )}

                {chat.photo && <img src={chat.photo} alt="" />}
                {chat.emoji && <p className="text-3xl">{chat.emoji}</p>}

                <p className="text-gray-500 inline-block rounded text-[12px]">
                  {moment(chat.date).fromNow()}
                </p>
              </div>
            ))}
            <br />
            <br />
            <br />
          </div>
        )}

        {/* <EmojiPicker onEmojiClick={onClick} autoFocusSearch={false} /> */}

        <div className="flex justify-between items-center border-t border-solid border-gray-300 py-4 relative emoji">
          {/* Emoji */}
          {emojiShow && <Picker onEmojiClick={onEmojiClick} />}

          <form className="flex justify-between w-full" onSubmit={handleSubmit}>
            <div className="w-full relative">
              <input
                type="text"
                name=""
                id=""
                placeholder="Type here....."
                className="w-full focus:outline-none bg-gray-300 rounded px-4 p-2 pr-16"
                value={msg || chosenEmoji}
                onChange={(e) => setMsg(e.target.value)}
              />

              <div className="absolute top-[50%] right-2 -translate-y-1/2 flex gap-2">
                <BsEmojiSmile
                  className="cursor-pointer"
                  onClick={handleEmojiShow}
                />

                <label htmlFor="file-upload" className="custom-file-upload">
                  <AiOutlineCamera className="cursor-pointer text-lg" />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleSelectImage}
                />
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
