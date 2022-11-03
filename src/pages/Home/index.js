import React, { useState } from "react";
import GroupRequest from "../../components/home/GroupRequest";
import Friends from "../../components/home/Friends";
import UserList from "../../components/home/UserList";
import FriendRequest from "../../components/home/FriendRequest";
import MyGroup from "../../components/home/MyGroup";
import BlockedUsers from "../../components/home/BlockedUsers";
import auth from "../../firebaseConfig";

export default function Home() {
  return (
    <>
      <div className="flex flex-wrap flex-col w-full overflow-hidden">
        <div className="flex flex-wrap mb-10 sm:justify-between sml:justify-around ">
          <div className="sm:w-[350px] sml:w-[427px] mb-10">
            <GroupRequest />
          </div>
          <div className="w-[344px] mb-10">
            <Friends />
          </div>
          <div className="w-[344px] mb-10">
            <UserList />
          </div>

          <div className="sm:w-[350px] sml:w-[427px] ">
            <FriendRequest />
          </div>
          <div className="w-[344px]">
            <MyGroup />{" "}
          </div>
          <div className="w-[344px]">
            <BlockedUsers />
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="flex flex-wrap justify-between">
<div className="w-[427px]">Home Left</div>
<div className="w-[344px]">Home Middle </div>
<div className="w-[344px]">Home Right</div>
</div>
</div> */
}
