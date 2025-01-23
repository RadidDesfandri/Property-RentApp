import React from "react";

const LoadingEditProperty = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-[300px] w-full bg-gray-300 rounded-md"></div>
      <div className="h-6 w-1/2 bg-gray-300 rounded-md"></div>
      <div className="flex gap-10">
        <div className="h-6 w-1/2 bg-gray-300 rounded-md"></div>
        <div className="h-6 w-1/2 bg-gray-300 rounded-md"></div>
      </div>
      <div className="h-32 w-full bg-gray-300 rounded-md"></div>
      <div className="h-10 w-1/4 bg-gray-300 rounded-md"></div>
    </div>
  );
};

export default LoadingEditProperty;
