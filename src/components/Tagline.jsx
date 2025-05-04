import React, { useState, useEffect } from 'react';
import vectorCurve from '../assets/curveVector.svg';
import landingDesktop from '../assets/landing_desktop2.svg';
import landingMob from '../assets/Landing_nogrid_mob.svg';

const Tagline = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [starPositions] = useState(() =>
    Array.from({ length: 25 }, () => ({
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 90 + 5}%`,
      animationDelay: `${Math.random() * 2}s`
    }))
  );
  

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full text-center px-4 z-30 bg-black overflow-hidden font-sans ">
      {/* Background Image */}
      <img
        src={windowWidth >= 640 ? landingDesktop : landingMob}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
      />

      {/* Stars */}
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

      {/* Gradient Fade Top */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20" />

      {/* Curve and Content */}
      <div className="relative w-full flex justify-center items-center  sm:mt-20 z-30 min-h-[800px]   sm:min-h-[800px]">
        {/* Vector Curve */}
        <img
  src={vectorCurve}
  alt="curve"
  className="absolute left-1/2 -translate-x-1/2 object-contain pointer-events-none"
  style={{ width: '800vw' }}
/>



        {/* Centered Content */}
        <div className="absolute top-[20%] sm:top-[35%] transform -translate-y-1/2 text-center flex flex-col items-center px-2 sm:px-4 pt-12 sm:pt-0 space-y-3 sm:space-y-6 max-w-[90%] mx-auto">
          {/* Tagline */}
          <div className="font-bold tracking-wide leading-tight flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-3 pb-20">
            {['Plan.', 'Publish.', 'Engage.'].map((text, i) => (
              <span
                key={i}
                className="bg-gradient-to-b from-gray-500 to-white text-transparent bg-clip-text"
                style={{
                  fontSize: 'clamp(2rem, 6vw, 5rem)',
                }}
              >
                {text}
              </span>
            ))}
          </div>
            
          {/* AT 0% */}
          <div className="relative mt-20">
          <h3
  className="uppercase font-poppins font-bold text-center tracking-wider"
  style={{
    fontSize: windowWidth < 640 ? '3rem' : 'clamp(3rem, 10vw, 12.5rem)',
    WebkitTextStroke: windowWidth < 640 ? '1.2px rgba(255, 255, 255, 0.5)' : '1px rgba(255, 255, 255, 0.5)',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    lineHeight: '1.1',
    letterSpacing: '0.05em',
    textShadow: '0 0 2px rgba(0,0,0,0.3)',
  }}
>
  AT 0%
</h3>

            {/* Black overlay for fading effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-40 pointer-events-none"
              style={{
                mixBlendMode: 'multiply' // This creates a dimming effect
              }}
            />
          </div>

          {/* COMMISSION */}
          <div className="relative">
          <h3
  className="uppercase font-poppins font-bold text-transparent leading-none text-center tracking-wider"
  style={{
    fontSize: 'clamp(3rem, 9vw, 12rem)',
    WebkitTextStroke: '1px rgba(255, 255, 255, 0.5)',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    textShadow: '0px 6px 20px rgba(0, 0, 0, 0.9), 0px 0px 40px rgba(0, 0, 0, 0.7)',
    filter: 'drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.8))',
    lineHeight: '1.1',
    letterSpacing: '0.05em'
  }}
>
  COMMISSION
</h3>

            {/* Black overlay for fading effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-40 pointer-events-none"
              style={{
                mixBlendMode: 'multiply' // This creates a dimming effect
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tagline;
