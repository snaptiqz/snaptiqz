import React, { useState, useEffect } from 'react';
import vectorCurve from '../assets/curveVector.svg';
import gridBg from '../assets/Grid_mob.svg';

const Tagline = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [starPositions] = useState(() =>
    Array.from({ length: 80 }, () => ({
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 90 + 5}%`,
      animationDelay: `${Math.random() * 2}s`,
    }))
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full text-center px-4 overflow-y-auto overflow-x-hidden font-sans min-h-screen scrollbar-hide bg-[#010205] z-50" style={{
       
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>

      {/* Background */}
     

      {/* Stars */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        {starPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-50 blur-[0.2px] animate-pulse"
            style={{ ...pos }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative w-full flex justify-center items-center mt-20 sm:mt-32 lg:mt-60 z-30 min-h-screen sm:min-h-[180vh] lg:min-h-[130vh]">
        {/* Vector Curve */}
      <img
  src={vectorCurve}
  alt="curve"
  className="absolute left-1/2 -translate-x-1/2 
     mt-[360px] sm:mt-0
    h-[60vh] sm:h-[100vh] lg:h-[120vh] 
    w-[100vw] max-w-none object-contain pointer-events-none transition-transform duration-1000 opacity-40"
/>



        {/* Content Wrapper */}
        <div className="absolute top-[30%] sm:top-[35%] transform -translate-y-1/2 text-center flex flex-col items-center px-2 sm:px-4  space-y-6 max-w-[90%] mx-auto">

          {/* Grid and Header */}
          <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 z-10 flex justify-center items-center">
              <div className="relative">
                <div
                  className="absolute inset-0 blur-[20px] transform scale-80 sm:scale-150"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 60%)',
                    zIndex: 0,
                    pointerEvents: 'none',
                  }}
                />
                <img
                  src={gridBg}
                  alt="grid background"
                  className="relative w-[24vw] pt-10 sm:pt-20 sm:w-[30vw] max-w-none h-auto object-contain opacity-80 z-10"
                />
              </div>
            </div>

            <p
  className="relative z-30 text-lg pb-10 sm:text-2xl lg:text-3xl  text-transparent bg-clip-text "
  style={{
    backgroundImage: 'linear-gradient(to bottom, #aaa 0%, #ddd 40%, #f8f8f8 80%, #fff 100%)',
  }}
>

              Host your events for free at Snaptiqz!
            </p>
          </div>

          {/* Tagline: Plan. Publish. Engage. */}
          <div className="font-bold tracking-wide leading-tight flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-3 pb-16 sm:pb-24 font-instrument">
            {['Plan.', 'Publish.', 'Engage.'].map((text, i) => (
              <span
                key={i}
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(to bottom, #666666 0%, #aaaaaa 60%, #f0f0f0 90%, #ffffff 100%)',
                  fontSize: 'clamp(4rem, 6vw, 5rem)',
                }}
              >
                {text}
              </span>
            ))}
          </div>

          {/* AT 0% COMMISSION */}
          <div className="relative mx-auto  sm:-translate-y-10 w-full flex flex-col items-center max-w-[400px] sm:max-w-[800px] px-2">
            <h3
              className="uppercase font-poppins font-bold tracking-wider text-center"
              style={{
                fontSize: 'clamp(4.5rem, 13vw, 12rem)',
                WebkitTextStroke: '1.4px rgba(255, 255, 255, 0.5)',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                letterSpacing: '0.05em',
                lineHeight: '1.1',
              }}
            >
              AT 0%
            </h3>
            <div className="w-full flex justify-center">
              <h3
                className="uppercase font-poppins font-bold tracking-wider text-center inline-block"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 7rem)',
                  WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.5)',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  lineHeight: '1.1',
                  textShadow: '0px 6px 20px rgba(0, 0, 0, 0.9), 0px 0px 40px rgba(0, 0, 0, 0.7)',
                  filter: 'drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.8))',
                }}
              >
                COMMISSION
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tagline;
