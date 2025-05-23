import React from "react";

const EventCardSkeleton = () => {
  return (
   <div className="bg-[#1e1e1e]/50 backdrop-blur-md border border-white/10 p-2 rounded-lg mb-4 text-white animate-pulse shadow-sm">

      {/* Header: Title + Privacy */}
      <div className="flex justify-between items-center mb-2">
        <div className="h-6 bg-gray-700 rounded w-3/5 shimmer"></div>
        <div className="h-4 bg-gray-700 rounded w-24 shimmer"></div>
      </div>

      {/* Body: Details + Image side-by-side */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-2 text-xs flex-1">
          {/* Date */}
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-2 bg-gray-700 rounded shimmer"></div>
            <div className="h-3 bg-gray-700 rounded w-32 shimmer"></div>
          </div>
          
          {/* Time */}
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-2 bg-gray-700 rounded shimmer"></div>
            <div className="h-2 bg-gray-700 rounded w-28 shimmer"></div>
          </div>
          
          {/* Location */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-3.5 bg-gray-700 rounded shimmer"></div>
            <div className="h-2 bg-gray-700 rounded w-36 shimmer"></div>
          </div>
          
        
         
        </div>

        {/* Image placeholder */}
        <div className="w-32 h-20 bg-gray-700 rounded shrink-0 shimmer"></div>
      </div>

      {/* Description/Guests section */}
      <div className="mt-2">
        <div className="h-3 bg-gray-700 rounded w-full mb-1 shimmer"></div>
       
      </div>

      {/* Tags */}
      <div className="mt-2 flex gap-2">
        <div className="h-2 bg-gray-700 rounded-full w-16 shimmer"></div>
        <div className="h-2 bg-gray-700 rounded-full w-20 shimmer"></div>
        <div className="h-2 bg-gray-700 rounded-full w-14 shimmer"></div>
      </div>

      <style >{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            #374151 0%,
            #4b5563 50%,
            #374151 100%
          );
          background-size: 200px 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
      
    </div>
  );
};

export default EventCardSkeleton;