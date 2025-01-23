import React from "react";

const LoadingDetailRooms = () => {
  return (
    <div className="animate-pulse space-y-4 bg-white px-10 pt-10">
      {/* Image Skeleton */}
      <div className="w-full h-64 bg-gray-300 rounded-md"></div>

      {/* Hotel Info Skeleton */}
      <div className="flex flex-col space-y-3">
        <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
      </div>

      {/* Image Gallery Skeleton */}
      <div className="flex space-x-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-1/4 h-32 bg-gray-300 rounded-md"></div>
        ))}
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2">
        <div className="w-full h-4 bg-gray-300 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
      </div>

      {/* Reservation Card Skeleton */}
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg w-80 space-y-4">
        <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
        <div className="w-full h-10 bg-gray-300 rounded"></div>
        <div className="w-full h-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default LoadingDetailRooms;
