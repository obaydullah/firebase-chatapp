import React from "react";
import Groups from "../../components/message/Groups";
import Friends from "../../components/message/Friends";
import Chat from "../../components/message/Chat";

export default function Message() {
  return (
    <div className="flex w-full h-screen p-2 gap-4">
      <div className="flex flex-col justify-between w-[30%]">
        <Groups />

        <Friends />
      </div>
      <div className="grow">
        <Chat />
      </div>
    </div>
  );
}
