import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ref, onValue, set, push, remove } from "firebase/database";
import { db } from "../../firebaseConfig";
import auth from "../../firebaseConfig";

export default function FriendRequest() {
  const [friendReq, setFriendReq] = useState([]);
  const [date, setDate] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [tempCount, setTempCount] = useState(0);

  useEffect(() => {
    const usersRef = ref(db, "friendrequest/");
    onValue(usersRef, (snapshot) => {
      let usersArr = [];

      snapshot.forEach((user) => {
        if (user.key == auth.currentUser.uid) {
          usersArr.push({ ...user.val(), id: user.key });
        }
      });

      setFriendReq(usersArr);
    });
  }, []);

  const handleAcceptReq = (friends) => {
    set(push(ref(db, "friends/")), {
      sendername: friends.sendername,
      senderid: friends.senderid,
      receiverid: friends.receiverid,
      receivername: friends.receivername,
      date: `${date}/${month}/${year}`,
      receiverphoto: friends.receiverphoto,
      senderphoto: friends.senderphoto,
    }).then(() => {
      remove(ref(db, "friendrequest/" + friends.id));
    });

    set(push(ref(db, "notification")), {
      senderid: auth.currentUser.uid,
      receiverid: friends.senderid,
      message: `${friends.receivername} accept ${friends.sendername} friend request`,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()} - ${new Date().toLocaleTimeString()}`,
    });

    //Unreade notification
    const unReadRef = ref(db, "unread/");

    let tempCountValue = 0;

    onValue(unReadRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (item.key === friends.senderid) {
          tempCountValue = item.val().count;
        }
      });

      setTempCount(tempCountValue);
    });

    set(ref(db, "unread/" + friends.senderid), {
      count: tempCountValue + 1,
    });
  };

  return (
    <div className="h-[365px] overflow-hidden">
      {/* Friend Request Start */}
      <div className="shadow-xl p-4 h-full overflow-y-scroll">
        <div className="flex justify-between mb-2">
          <h2 className="text-black text-xl font-bold">Friend Request</h2>
          <BiDotsVerticalRounded className="text-green-600 text-2xl cursor-pointer" />
        </div>

        {/* Single Friend Request Start */}

        {friendReq.map((fr, index) => (
          <div
            className={`flex justify-between items-center border-b border-solid border-gray-300 py-2 ${
              index === friendReq.length - 1 && "border-b-0"
            }`}
            key={index}
          >
            <img
              src={fr.senderphoto}
              alt=""
              className="h-[60px] w-[60px] rounded-full"
            />
            <div className="sm:mr-0 sml:mr-10">
              <h2 className="font-bold sm:text-base sml:text-xl ">
                {fr.sendername}
              </h2>
              <p className="text-sm text-gray-500">Hi guys, Whats up</p>
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded text-base"
              onClick={() => handleAcceptReq(fr)}
            >
              Accept
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
