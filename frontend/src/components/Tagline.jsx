import React from 'react';
import vectorCurve from '../assets/curveVector.png';

const Tagline = () => {
  return (
    <div className="relative w-full text-center px-4 z-30 bg-black overflow-hidden font-sans mb-20">
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

      {/* Optional gradient fade */}
      <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black to-transparent z-20" />

      {/* Text on top of vector curve */}
      <div className="relative w-full flex justify-center items-center mt-20 sm:mt-20 z-30 min-h-[700px] sm:min-h-[900px]">
        {/* Vector Curve */}
        <img
          src={vectorCurve}
          alt="curve"
          className="w-full h-auto object-contain pointer-events-none max-w-7xl"
        />

        {/* Text over image */}
        <div className="absolute top-[20%] sm:top-[35%] transform -translate-y-1/2 text-center flex flex-col items-center px-2 sm:px-4 pt-12 sm:pt-0 space-y-3 sm:space-y-6 max-w-[90%] mx-auto">

          {/* Plan. Publish. Engage. */}
          <div className="font-bold   tracking-wide leading-tight flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-3 pb-20">
            {['Plan.', 'Publish.', 'Engage.'].map((text, i) => (
              <span
                key={i}
                className="bg-gradient-to-b from-gray-500 to-white text-transparent bg-clip-text"
                style={{
                  fontSize: 'clamp(2rem, 6vw, 5rem)'

                }}
              >
                {text}
              </span>
            ))}
          </div>

          {/* AT 0% */}
          <h3
            className="uppercase font-extrabold text-transparent leading-none mt-20"
            style={{
              fontSize: 'clamp(3rem, 10vw, 12.5rem)',
              WebkitTextStroke: '1.5px #ffffffaa',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AT 0%
          </h3>

          {/* COMMISSION */}
          <h3
            className="uppercase font-extrabold text-transparent leading-none"
            style={{
             fontSize: 'clamp(3rem, 9vw, 12rem)',
              WebkitTextStroke: '1px #ffffffaa',
              WebkitTextFillColor: 'transparent',
            }}
          >
            COMMISSION
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Tagline;
