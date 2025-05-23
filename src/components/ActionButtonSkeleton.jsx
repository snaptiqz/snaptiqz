import React from "react";

const ActionButtonSkeleton = () => {
  return (
    <div className="flex flex-row gap-2 justify-end mt-2 mb-6 animate-pulse">
      <div className="w-[130px] h-[32px] bg-gray-800 rounded-md shimmer" />
      <div className="w-[120px] h-[32px] bg-gray-800 rounded-md shimmer" />

      <style>{`
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

export default ActionButtonSkeleton;
