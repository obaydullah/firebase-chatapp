import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { ref, onValue, set, push, remove } from "firebase/database";
import auth from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";

export default function Notification() {
  const [notificationArr, setNotificationArr] = useState([]);

  useEffect(() => {
    const notificationRef = ref(db, "notification/");
    onValue(notificationRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((notification) => {
        if (notification.val().receiverid === auth.currentUser.uid) {
          arr.push(notification.val());
        }
        if (
          notification.val().status == "groupnotification" &&
          notification.val().senderid !== auth.currentUser.uid
        ) {
          arr.push(notification.val());
        }
      });

      setNotificationArr(arr);
    });
  }, []);
  return (
    <>
      <div className="flex flex-col w-full px-6 py-2 h-screen">
        <div className="relative my-2">
          <BsSearch className="absolute top-4 left-4  z-10" />
          <input
            type="text"
            name=""
            id=""
            className="w-full shadow-lg rounded-2xl focus:outline-none px-12 py-3"
            placeholder="Search here"
          />
          <BiDotsVerticalRounded className="absolute top-4 right-4 z-10 cursor-pointer text-lg" />
        </div>
        <div className="grow border border-solid border-gray-200 rounded-xl p-4 overflow-y-scroll">
          {notificationArr.reverse().map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between border-b border-solid border-gray-200 py-2 ${
                index === notificationArr.length - 1 && "border-b-0"
              }`}
            >
              <IoIosNotifications className="mr-4 text-4xl" />
              <p className="mr-auto ">{item.message}</p>
              <p>{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
