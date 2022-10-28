import React from "react";
import { BsSearch } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";

export default function GroupRequest() {
  return (
    <>
      <div className="h-[365px] overflow-hidden">
        {/* Search Start  */}

        <div className="relative my-2">
          <BsSearch className="absolute top-4 left-4  z-10" />
          <input
            type="text"
            name=""
            id=""
            className="w-full drop-shadow-xl rounded-lg focus:outline-none px-14 py-3"
            placeholder="Search here"
          />
          <BiDotsVerticalRounded className="absolute top-4 right-4  z-10 cursor-pointer text-lg" />
        </div>

        {/* Group Request Start */}
        <div className="shadow-xl p-4 h-full overflow-y-scroll">
          <div className="flex justify-between mb-2">
            <h2 className="text-black font-bold text-xl ">Group Request</h2>
            <BiDotsVerticalRounded className="text-green-600 text-2xl cursor-pointer" />
          </div>

          {/* Single Group Request Start */}
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
    </>
  );
}
