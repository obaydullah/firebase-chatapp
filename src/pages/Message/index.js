import React from "react";

export default function Message() {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex justify-around">
        <div className="w-[427px]">Home Left</div>
        <div className="w-[344px]">Home Middle </div>
        <div className="w-[344px]">Home Right</div>
      </div>
      <div className="flex justify-around">
        <div className="w-[427px]">Home Bottom Left</div>
        <div className="w-[344px]">Home Bottom Middle </div>
        <div className="w-[344px]">Home Bottom Right</div>
      </div>
    </div>
  );
}
