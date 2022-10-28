import React from "react";
import { BsSearch } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";

export default function FriendRequest() {
  return (
    <div className="h-[365px] overflow-hidden">
      {/* Friend Request Start */}
      <div className="shadow-xl p-4 h-full overflow-y-scroll">
        <div className="flex justify-between mb-2">
          <h2 className="text-black text-xl font-bold">Friend Request</h2>
          <BiDotsVerticalRounded className="text-green-600 text-2xl cursor-pointer" />
        </div>

        {/* Single Friend Request Start */}
        <div className="flex justify-between items-center border-b border-solid border-gray-300 py-2">
          <img
            src="./images/profile.png"
            alt=""
            className="h-[60px] w-[60px]"
          />
          <div className="sm:mr-0 sml:mr-10">
            <h2 className="font-bold sm:text-base sml:text-xl ">
              Friends Reunioin
            </h2>
            <p className="text-sm text-gray-500">Hi guys, Whats up</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded text-base">
            Accept
          </button>
        </div>
        <div className="flex justify-between items-center border-b border-solid border-gray-300 py-2">
          <img
            src="./images/profile.png"
            alt=""
            className="h-[60px] w-[60px]"
          />
          <div className="sm:mr-0 sml:mr-10">
            <h2 className="font-bold sm:text-base sml:text-xl ">
              Friends Reunioin
            </h2>
            <p className="text-sm text-gray-500">Hi guys, Whats up</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded text-base">
            Accept
          </button>
        </div>
        <div className="flex justify-between items-center border-b border-solid border-gray-300 py-2">
          <img
            src="./images/profile.png"
            alt=""
            className="h-[60px] w-[60px]"
          />
          <div className="sm:mr-0 sml:mr-10">
            <h2 className="font-bold sm:text-base sml:text-xl ">
              Friends Reunioin
            </h2>
            <p className="text-sm text-gray-500">Hi guys, Whats up</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded text-base">
            Accept
          </button>
        </div>
        <div className="flex justify-between items-center border-b border-solid border-gray-300 py-2">
          <img
            src="./images/profile.png"
            alt=""
            className="h-[60px] w-[60px]"
          />
          <div className="sm:mr-0 sml:mr-10">
            <h2 className="font-bold sm:text-base sml:text-xl ">
              Friends Reunioin
            </h2>
            <p className="text-sm text-gray-500">Hi guys, Whats up</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded text-base">
            Accept
          </button>
        </div>
        <div className="flex justify-between items-center border-b border-solid border-gray-300 py-2">
          <img
            src="./images/profile.png"
            alt=""
            className="h-[60px] w-[60px]"
          />
          <div className="sm:mr-0 sml:mr-10">
            <h2 className="font-bold sm:text-base sml:text-xl ">
              Friends Reunioin
            </h2>
            <p className="text-sm text-gray-500">Hi guys, Whats up</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded text-base">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
