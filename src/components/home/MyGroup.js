import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ref, onValue, remove, set, push, update } from "firebase/database";
import { db } from "../../firebaseConfig";
import auth from "../../firebaseConfig";

export default function MyGroup() {
  const [myGroup, setMyGroup] = useState([]);
  const [groupRequest, setGroupRequest] = useState([]);
  const [membersArr, setMembersArr] = useState([]);

  const [infoShow, setInfoShow] = useState(false);
  const [memberShow, setMemberShow] = useState(false);

  useEffect(() => {
    const groupRef = ref(db, "group");
    onValue(groupRef, (snapshot) => {
      let groupArray = [];

      snapshot.forEach((user) => {
        if (auth.currentUser.uid == user.val().adminid) {
          groupArray.push({ ...user.val(), groupid: user.key });
        }
      });

      setMyGroup(groupArray);
    });
  }, []);

  const handleReqShow = (group) => {
    setInfoShow((prevState) => {
      return !prevState;
    });

    const groupjoinRef = ref(db, "groupjoinrequest");
    onValue(groupjoinRef, (snapshot) => {
      let groupJoinArray = [];

      snapshot.forEach((user) => {
        if (group.groupid === user.val().groupkey) {
          groupJoinArray.push({ ...user.val(), key: user.key });
        }
      });

      setGroupRequest(groupJoinArray);
    });
  };

  const handleMember = (member) => {
    setMemberShow(!memberShow);

    const memberRef = ref(db, "memberlist");
    onValue(memberRef, (snapshot) => {
      let memberArray = [];

      snapshot.forEach((user) => {
        if (member.groupid === user.val().groupkey) {
          memberArray.push({ ...user.val(), key: user.key });
        }
      });

      setMembersArr(memberArray);
    });
  };

  const handleRemoveMember = (member) => {
    remove(ref(db, "memberlist/" + member.key));
    setInfoShow(false);
  };

  const handleRejectRequest = (group) => {
    remove(ref(db, "groupjoinrequest/" + group.key));
  };

  const handleAcceptReq = (group) => {
    set(push(ref(db, "memberlist/")), {
      adminid: group.adminid,
      adminname: group.adminname,
      groupTagline: group.groupTagline,
      groupTitle: group.groupTitle,
      groupimage: group.groupimage,
      groupkey: group.groupkey,
      userid: group.reqid,
      username: group.reqname,
      reqphoto: group.reqphoto,
    })
      .then(() => {
        remove(ref(db, "groupjoinrequest/" + group.key));
      })
      .then(() => {
        setInfoShow(false);
      });
  };

  return (
    <>
      {/* Friends Start */}
      <div className="shadow-xl p-4 h-[365px] overflow-y-scroll">
        <div className="flex justify-between mb-2">
          <h2 className="text-black text-xl font-bold">My Group</h2>
          <BiDotsVerticalRounded className="text-green-600 text-2xl cursor-pointer" />
        </div>

        {/* Single Friend Start */}

        {infoShow ? (
          <>
            <div className="flex justify-between">
              <h2 className="text-green-600 text-lg font-bold">Req List</h2>
              <button
                className="bg-green-600 text-white p-2 rounded"
                onClick={() => setInfoShow((prevState) => !prevState)}
              >
                Back
              </button>
            </div>
            {groupRequest.map((group, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-solid border-gray-300 py-2"
              >
                <img
                  src={group.reqphoto}
                  alt=""
                  className="h-[50px] w-[50px] rounded-full"
                />
                <div className="sm:mr-0 sml:mr-auto sml:ml-3 mr-2">
                  <h2 className="text-base font-bold"> {group.reqname}</h2>
                  <p className="text-sm text-gray-500">Whats up!</p>
                </div>
                <button
                  className="bg-green-600 text-white p-2 rounded mr-2"
                  onClick={() => handleAcceptReq(group)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 text-white p-2 rounded"
                  onClick={() => handleRejectRequest(group)}
                >
                  Reject
                </button>
              </div>
            ))}
          </>
        ) : memberShow ? (
          <>
            <div className="flex justify-between">
              <h2 className="text-green-600 text-lg font-bold">Member List</h2>
              <h3>Total {membersArr.length} </h3>
              <button
                className="bg-green-600 text-white p-2 rounded"
                onClick={() => setMemberShow((prevState) => !prevState)}
              >
                Back
              </button>
            </div>
            {membersArr.map((member, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-solid border-gray-300 py-2"
              >
                <img
                  src={member.reqphoto}
                  alt=""
                  className="h-[50px] w-[50px] rounded-full"
                />
                <div className="sm:mr-0 sml:mr-auto sml:ml-3 mr-2">
                  <h2 className="text-base font-bold"> {member.username}</h2>
                  <p className="text-sm text-gray-500">Whats up!</p>
                </div>

                <button
                  className="bg-red-600 text-white p-2 rounded"
                  onClick={() => handleRemoveMember(member)}
                >
                  remove
                </button>
              </div>
            ))}
          </>
        ) : (
          myGroup.map((group, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-solid border-gray-300 py-2"
            >
              <img
                src={group.groupimage}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="sm:mr-0 sml:mr-auto sml:ml-3 mr-2">
                <h2 className="text-base font-bold"> {group.groupTitle}</h2>
                <p className="text-sm text-gray-500">{group.groupTagline}</p>
              </div>
              <button
                className="bg-green-600 text-white p-2 rounded mr-2"
                onClick={() => handleReqShow(group)}
              >
                Info
              </button>
              <button
                className="bg-green-600 text-white p-2 rounded"
                onClick={() => handleMember(group)}
              >
                Member
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
