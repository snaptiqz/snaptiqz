import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import mike from '../assets/mike.png';
import gridBg from '../assets/Grid_mob.svg';
import landingDesktop from '../assets/landing_desktop2.svg';
import landingMob from '../assets/Landing_nogrid_mob.svg';
import google from "../assets/google_logo.png";
import curl2 from '../assets/24.png';
import curl1 from '../assets/25.png';
import curlDeskLeft from '../assets/26.png';
import curlDeskRight from '../assets/27.png';
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import SignupPopup from './SignupPopup';

const Landing = () => {
  const [showGrid, setShowGrid] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [animationState, setAnimationState] = useState('initial');
  const [showPopup, setShowPopup] = useState(false);
  const [showDesktopCurls, setShowDesktopCurls] = useState(false);
  const [curlsExited, setCurlsExited] = useState(false);
   const [time, setTime] = useState('');

  const [starPositions] = useState(() =>
    Array.from({ length: 60 }, () => ({
      width: `${Math.random() * 2 }px`,
      height: `${Math.random() * 2 + 1}px`,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 90 + 5}%`,
      animationDelay: `${Math.random() * 2}s`
    }))
  );
  
 
 

  const navigate = useNavigate();

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPopup]);
  

  

  useEffect(() => {
    const timer = setTimeout(() => setShowGrid(false), 3000);
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    // Set time in GMT+5:30 format
    const updateTime = () => {
      const now = new Date();
      const hours = now.getUTCHours() + 5;
      const minutes = now.getUTCMinutes() + 30;
      const adjustedHours = (hours + Math.floor(minutes / 60)) % 24;
      const adjustedMinutes = minutes % 60;
      setTime(`${String(adjustedHours).padStart(2, '0')}:${String(adjustedMinutes).padStart(2, '0')} GMT+5:30`);
    };
    
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  const TopRightNav = () => {
    return (
      <div
        className="hidden sm:flex absolute top-0 right-0 z-40 px-3 py-2 text-white/90 items-center space-x-7 text-lg rounded-bl-xl"
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(3px)',
          borderLeft: '2px solid rgba(192,192,192,0.4)',
          borderBottom: '1px solid rgba(192,192,192,0.2)',
          boxShadow: `
            inset 1px 1px 3px rgba(0,0,0,0.7),
            inset -1px -1px 2px rgba(255,255,255,0.1)
          `
        }}
      >
        <div className="px-3 py-1 rounded-md" >
          {time}
        </div>
        <button className="px-3 py-1 rounded-md hover:text-white transition" >
          Explore event
        </button>
        <button className="px-3 py-1 rounded-md hover:text-white transition" >
          Sign in
        </button>
      </div>
    );
  };
  

  const handleGetHosting = () => {
    setAnimationState('transitioning');
    setTimeout(() => setCurlsExited(true), 1000);
    setTimeout(() => {
      setShowPopup(true);
      setAnimationState('showPopup');
    }, 2000);
  };
  
  const handleClosePopup = () => {
  setShowPopup(false);
  setAnimationState('transitioning'); // fade elements out

  // Restore the landing page after transition
  setTimeout(() => {
    setCurlsExited(false);
    setAnimationState('initial');
  }, 500); // 800ms for smoother transition
};

  useEffect(() => {
    if (animationState === 'initial' && window.innerWidth >= 640) {
      setShowDesktopCurls(true);
    }
  }, [animationState, window.innerWidth]);
  
  
  const getTargetY = () => {
    if (animationState === 'transitioning' || animationState === 'showPopup') {
      return windowWidth < 640 ? -300 : -200;
    }
    return 0;
  };
  
  const targetY = getTargetY();
   



  

  return (
<div className="gradient-bg w-full h-screen overflow-y-scroll overflow-x-hidden text-white font-sans flex items-center justify-center relative scrollbar-hide">

<img
  src={gridBg}
  alt="grid background"
  className="hidden sm:block absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-3/4 w-[120vw] sm:w-[28vw] max-w-none pointer-events-none z-0"
/>



      {/* Background Image */}
      
          <TopRightNav />
      {/* Grid Overlay */}
      {showGrid && (
        <motion.img
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          src={gridBg}
          alt="grid-overlay"
          className="absolute top-1/2 left-1/2 w-[80vw] max-w-[500px] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        />
      )}

      {/* Star Animation */}
      {animationState === 'initial' && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
  >
    {starPositions.map((pos, i) => (
      <div
        key={i}
        className="absolute bg-white rounded-full opacity-30 animate-pulse"
        style={{
          ...pos
        }}
      />
    ))}
  </motion.div>
)}

     

      {/* Content Text */}
      <motion.div
  initial={{ y: -100, opacity: 0 }}
  animate={{
    y: animationState === 'transitioning' || animationState === 'showPopup' ? -1000 : 0,
    opacity: animationState === 'transitioning' ? 0 : 1
  }}
  transition={{ duration: 1.2, ease: 'easeInOut' }}
  className="absolute top-0 left-0 w-full flex flex-col items-center px-4 z-20 pt-24 sm:pt-40 md:pt-20 lg:pt-20 text-center"


>



        <h1 className="text-4xl md:text-4xl md:mt-10 lg:text-3xl mt-4 sm:mt-4  bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text ">
  Start Hosting Your Events.
</h1>
<p className="hidden lg:block  lg:text-md   leading-relaxed max-w-2xl mx-auto text-white/90">
  Create and join organizations, Host events and sell tickets to your guests.<br />
  Happy tiqz!
</p>

<p className="text-sm lg:hidden lg:text-lg mt-4 md:text-xl md:mt-4 leading-relaxed max-w-2xl mx-auto text-white/90 ">
  Create and join organizations, Host events and sell tickets to your guests. Happy tiqz!
</p>


<button
  onClick={handleGetHosting}
  className="lg:mt-8 md:mt-8 lg:px-5 lg:py-3 px-8 py-2 md:px-12 md:py-4 mt-3 rounded-full border-2 border-[#444] bg-[#1a1a1a] text-lg relative hover:scale-105 transition-all duration-300 shadow-[inset_0_4px_6px_rgba(255,255,255,0.05),0_4px_10px_rgba(0,0,0,0.4)]"
>
  <span className="bg-gradient-to-b md:text-xl from-white to-gray-400 text-transparent bg-clip-text font-semibold">
    Get Hosting
  </span>
</button>




      </motion.div>

      {/* Mike Image */}
      <motion.img
  src={mike}
  alt="mike"
  className={`mx-auto z-30 ${
    windowWidth < 640 ? 'w-48 mt-14' : 'lg:w-60 lg:mt-40 md:mt-30 md:w-80 '
  }`}
  initial={{ y: -150, opacity: 0 }}
  animate={{ y: targetY, opacity: 1 }}
  transition={{ duration: 1.2, ease: 'easeInOut' }}
/>





      {/* Conditional Curls */}
      {windowWidth < 640 && !curlsExited && (
  <>
    {/* curl1 enters from left, exits left */}
    <motion.img
      initial={{ x: -300, opacity: 0 }}
      animate={animationState === 'transitioning'
        ? { x: -500, opacity: 0 }
        : { x: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      src={curl1}
      alt="left-curl"
      className="absolute top-[30%] ml-[3px] left-0 w-[64vw] max-w-[400px] transform -translate-y-1/2 rotate-[60deg] z-10"
    />

    {/* curl2 enters from left (delayed), exits right */}
    <motion.img
      initial={{ x: -300, opacity: 0 }}
      animate={animationState === 'transitioning'
        ? { x: 500, opacity: 0 }
        : { x: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.1 }}
      src={curl2}
      alt="right-curl"
      className="absolute top-[30%] right-0 w-[60vw] max-w-[400px] transform -translate-y-1/2 rotate-[120deg] z-10"
    />
  </>
)}
{windowWidth >= 640 && showDesktopCurls && !curlsExited && (
  <>
    {/* Left curl: appears with scale, exits left */}
    <motion.img
      initial={{ opacity: 0, scale: 0.95 }}
      animate={animationState === 'transitioning'
        ? { x: -500, opacity: 0 }
        : { opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      src={curlDeskLeft}
      alt="desktop-left-curl"
      className="absolute lg:top-[40%] md:mr-[45%]   lg:mr-[18%] lg:w-[28vw] md:w-[65vw] lg:max-w-[700px] transform -translate-x-[120%] -translate-y-1/2 rotate-[60deg] z-10"
    />

    {/* Right curl: appears delayed, exits right */}
    <motion.img
      initial={{ opacity: 0, scale: 0.95 }}
      animate={animationState === 'transitioning'
        ? { x: 500, opacity: 0 }
        : { opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
      src={curlDeskRight}
      alt="desktop-right-curl"
      className="absolute lg:top-[40%]   md:ml-[50%] md:w-[65vw]  lg:ml-[20%] lg:w-[26vw] lg:max-w-[700px] transform translate-x-[120%] -translate-y-1/2 rotate-[120deg] z-10"
    />
  </>
)}

{showPopup && (
  <SignupPopup onClose={handleClosePopup} />
)}



    </div>
  );
};

export default Landing;
