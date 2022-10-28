import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

export default function MyGroup() {
  return (
    <>
      {/* Friends Start */}
      <div className="shadow-xl p-4 h-[365px] overflow-y-scroll">
        <div className="flex justify-between mb-2">
          <h2 className="text-black text-xl font-bold">My Group</h2>
          <BiDotsVerticalRounded className="text-green-600 text-2xl cursor-pointer" />
        </div>

        {/* Single Friend Start */}
        <div className="flex justify-between items-center border-b border-solid border-gray-300 py-2">
          <img
            src="./images/profile.png"
            alt=""
            className="h-[50px] w-[50px]"
          />
          <div>
            <h2 className="text-base font-bold">Friends Reunion</h2>
            <p className="text-sm text-gray-500">Hi guys, Whats up</p>
          </div>
          <p className="text-[10px] text-gray-400">Today: 9.00pm</p>
        </div>

        <div className="flex justify-between items-center border-b border-solid border-gray-300 py-2">
          <img
            src="./images/profile.png"
            alt=""
            className="h-[50px] w-[50px]"
          />
          <div>
            <h2 className="text-base font-bold">Friends Reunion</h2>
            <p className="text-sm text-gray-500">Hi guys, Whats up</p>
          </div>
          <p className="text-[10px] text-gray-400">Today: 9.00pm</p>
        </div>

        <div className="flex justify-between items-center border-b border-solid border-gray-300 py-2">
          <img
            src="./images/profile.png"
            alt=""
            className="h-[50px] w-[50px]"
          />
          <div>
            <h2 className="text-base font-bold">Friends Reunion</h2>
            <p className="text-sm text-gray-500">Hi guys, Whats up</p>
          </div>
          <p className="text-[10px] text-gray-400">Today: 9.00pm</p>
        </div>
        <div className="flex justify-between items-center border-b border-solid border-gray-300 py-2">
          <img
            src="./images/profile.png"
            alt=""
            className="h-[50px] w-[50px]"
          />
          <div>
            <h2 className="text-base font-bold">Friends Reunion</h2>
            <p className="text-sm text-gray-500">Hi guys, Whats up</p>
          </div>
          <p className="text-[10px] text-gray-400">Today: 9.00pm</p>
        </div>
        <div className="flex justify-between items-center border-b border-solid border-gray-300 py-2">
          <img
            src="./images/profile.png"
            alt=""
            className="h-[50px] w-[50px]"
          />
          <div>
            <h2 className="text-base font-bold">Friends Reunion</h2>
            <p className="text-sm text-gray-500">Hi guys, Whats up</p>
          </div>
          <p className="text-[10px] text-gray-400">Today: 9.00pm</p>
        </div>
      </div>
    </>
  );
}
