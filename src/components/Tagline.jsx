import React, { useState, useEffect } from 'react';
import vectorCurve from '../assets/curveVector.svg';
import gridBg from '../assets/Grid_mob.svg';
import { motion } from 'framer-motion';

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
  <div className="w-full text-center px-4 font-sans min-h-screen bg-[#010205] z-50 overflow-hidden"
  style={{
    scrollbarWidth: 'none',        // Firefox
    msOverflowStyle: 'none',       // IE 10+
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }}
>



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
      <div className="relative w-full flex justify-center items-center mt-20 sm:mt-22 lg:mt-60 z-30 min-h-[100dvh] sm:min-h-[100vh] lg:min-h-[200vh]">
        {/* Vector Curve */}
    <img
  src={vectorCurve}
  alt="curve"
  loading="lazy"
  className="absolute left-1/2 -translate-x-1/2 mt-[360px] md:mt-10 sm:mt-34 h-[60vh] sm:h-[100vh] lg:h-[120vh] max-h-[90vh] w-[200vw] max-w-none object-contain pointer-events-none transition-transform duration-1000 "
/>




        {/* Content Wrapper */}
        <div className="absolute top-[40%] sm:top-[35%] transform -translate-y-1/2 text-center flex flex-col items-center px-2 sm:px-4  space-y-8 max-w-screen mx-auto">

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
                  className="relative w-[28vw] pt-10 sm:pt-20 sm:w-[30vw] max-w-none h-auto object-contain opacity-80 z-10"
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
        <motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  className="font-bold tracking-wide leading-tight flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-3 pb-16 sm:pb-24 font-instrument"
>
  {['Plan.', 'Publish.', 'Engage.'].map((text, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: i * 0.3, duration: 0.8, ease: 'easeInOut' }}
      className="text-transparent bg-clip-text"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, #666666 0%, #aaaaaa 60%, #f0f0f0 90%, #ffffff 100%)',
        fontSize: 'clamp(4rem, 6vw, 5rem)',
      }}
    >
      {text}
    </motion.span>
  ))}
</motion.div>


          {/* AT 0% COMMISSION */}
       <div className="w-screen sm:-translate-y-10 mt-10">
  <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, amount: 0.5 }}
 transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }} 
  className="w-full text-center"
>
  <h3
    className="uppercase font-poppins font-bold tracking-wider"
    style={{
      fontSize: 'clamp(7rem, 16vw, 16rem)',
      WebkitTextStroke: '1.4px rgba(255, 255, 255, 0.5)',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      letterSpacing: '0.04em',
      lineHeight: '1.1',
    }}
  >
    AT 0%
  </h3>
  <h3
    className="uppercase font-poppins font-bold tracking-wider"
    style={{
      fontSize: 'clamp(3rem, 8vw, 7rem)',
      WebkitTextStroke: '1.4px rgba(255, 255, 255, 0.5)',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      lineHeight: '1.1',
      textShadow: '0px 6px 20px rgba(0, 0, 0, 0.9), 0px 0px 40px rgba(0, 0, 0, 0.7)',
      filter: 'drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.8))',
    }}
  >
    COMMISSION
  </h3>
</motion.div>

</div>
        </div>
      </div>
    </div>
  );
};

export default Tagline;
