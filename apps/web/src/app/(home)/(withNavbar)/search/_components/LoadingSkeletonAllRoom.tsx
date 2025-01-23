import React from "react";

const LoadingSkeletonAllRoom = () => {
  return (
    <div className="flex animate-pulse items-center gap-5 rounded-md border bg-slate-100 p-3">
      <div className="h-[110px] w-1/4 rounded-md bg-gray-300"></div>

      <div className="flex h-[110px] w-10/12 justify-between">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="h-5 w-72 rounded-md bg-gray-300"></div>
            <div className="h-3 w-60 rounded-md bg-gray-300"></div>
            <div className="h-3 w-10 rounded-md bg-gray-300"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded-md bg-gray-300"></div>
            <div className="h-3 w-8 rounded-md bg-gray-300"></div>
            <div className="h-3 w-8 rounded-md bg-gray-300"></div>
          </div>
        </div>
        <div className="h-5 w-40 rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
};

export default LoadingSkeletonAllRoom;
