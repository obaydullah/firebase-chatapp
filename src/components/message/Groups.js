import React, { useState, useEffect, useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import auth from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useDispatch } from "react-redux";
import {
  activeChat,
  activeChatGroup,
} from "../../features/activeChat/activeChatSlice";

export default function Groups() {
  const dispatch = useDispatch();

  const [groups, setGroups] = useState([]);
  // const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "group/");
    onValue(usersRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((user) => {
        if (auth.currentUser.uid === user.val().adminid) {
          arr.push({ ...user.val(), groupkey: user.key });
        }

        if (user.val().members) {
          if (user.val().members.includes(auth.currentUser.uid)) {
            arr.push({ ...user.val(), groupkey: user.key });
          }
        }
      });

      setGroups(arr);
    });
  }, []);

  const handleGroupChat = (group) => {
    dispatch(activeChatGroup(group));
  };

  return (
    <>
      <div className="h-[48vh] overflow-hidden shadow-lg p-2 overflow-y-scroll">
        {/* Search Start  */}

        <div className="relative my-2">
          <BsSearch className="absolute top-4 left-4 z-10" />
          <input
            type="text"
            name=""
            id=""
            className="w-full drop-shadow-xl rounded-lg focus:outline-none px-14 py-3"
            placeholder="Search here"
          />
          <BiDotsVerticalRounded className="absolute top-4 right-4  z-10 cursor-pointer text-lg" />
        </div>

        <div className="relative my-2">
          <h3 className="text-green-600 text-xl font-bold">Groups</h3>

          <BiDotsVerticalRounded className="absolute top-4 right-4  z-10 cursor-pointer text-lg" />
        </div>

        {/* Group Request Start */}

        {groups.map((group, index) => (
          <div
            key={index}
            className={`flex justify-between items-center border-b border-solid border-gray-300 py-2 cursor-pointer ${
              index === groups.length - 1 && "border-b-0"
            }`}
            onClick={() => handleGroupChat(group)}
          >
            <img
              src={group.groupimage}
              alt=""
              className="h-[60px] w-[60px] rounded-full"
            />
            <div className="sm:mr-0 sml:mr-auto sml:ml-3">
              <h2 className="font-bold sm:text-base sml:text-xl ">
                {group.groupTitle}
              </h2>
              <p className="text-sm text-gray-500">{group.groupTagline}</p>
              <p className="text-sm text-gray-900">Admin : {group.adminname}</p>
            </div>
          </div>
        ))}

        {/* {memberList.map((member, index) => (
          <div
            key={index}
            className={`flex justify-between items-center border-b border-solid border-gray-300 py-2 ${
              index === memberList.length - 1 && "border-b-0"
            }`}
          >
            <img
              src={member.groupimage}
              alt=""
              className="h-[60px] w-[60px] rounded-full"
            />
            <div className="sm:mr-0 sml:mr-auto sml:ml-3">
              <h2 className="font-bold sm:text-base sml:text-xl ">
                {member.groupTitle}
              </h2>
              <p className="text-sm text-gray-500">{member.groupTagline}</p>
              <p className="text-sm text-gray-900">
                Admin : {member.adminname}
              </p>
            </div>
          </div>
        ))} */}
      </div>
    </>
  );
}
