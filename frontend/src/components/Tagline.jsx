import React from 'react';
import vectorCurve from '../assets/curveVector.png';

const Tagline = () => {
  return (
    <div className="relative w-full text-center px-4 z-30 bg-black overflow-hidden  font-sans mb-20">
      {/* Star background */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-30 animate-pulse"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 90 + 5}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Optional gradient fade (keep or remove) */}
      <div className="absolute top-0 left-0 w-full  bg-gradient-to-b from-black to-transparent z-20" />

      {/* Text content */}
      <div className="relative z-30 space-y-10 sm:space-y-12">
        {/* Plan. Publish. Engage. */}
        <div className="text-xl sm:text-5xl font-bold tracking-wide leading-snug flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 mt-20">
          {['Plan.', 'Publish.', 'Engage.'].map((text, i) => (
            <span
              key={i}
              className="bg-gradient-to-b from-gray-500 to-white text-transparent bg-clip-text"
            >
              {text}
            </span>
          ))}
        </div>

        {/* AT 0% COMMISSION */}
        <div className="mt-20 ">
  <h3
    className="text-[56px] sm:text-[120px] uppercase tracking-wide font-extrabold"
    style={{
      WebkitTextStroke: '1px #ffffffaa',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    }}
  >
    AT 0%
  </h3>
  <h3
    className="text-[56px] sm:text-[120px] uppercase tracking-wide font-extrabold"
    style={{
      WebkitTextStroke: '1px #ffffffaa',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    }}
  >
    COMMISSION
  </h3>
</div>


        {/* Optional subtitle if still needed */}
       
        {/* Vector Curve */}
        <img
  src={vectorCurve}
  alt="curve"
  className="w-full h-auto object-contain pointer-events-none -mt-6 sm:-mt-10"
/>

      </div>
    </div>
  );
};

export default Tagline;
