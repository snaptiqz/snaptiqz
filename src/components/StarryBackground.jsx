import React, { useMemo } from 'react';

const StarryBackground = ({ count = 30 }) => {
  const stars = useMemo(() => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 ,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.2,
      delay: `${Math.random() * 2}s`,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none mb-20">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full opacity-20 animate-pulse"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            opacity: star.opacity,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;
