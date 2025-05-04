import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import mike from '../assets/mike_svg.svg';
import gridBg from '../assets/Grid_mob.svg';
import landingDesktop from '../assets/landing_desktop2.svg';
import landingMob from '../assets/Landing_nogrid_mob.svg';
import google from "../assets/google_logo.png";
import curl2 from '../assets/24.png';
import curl1 from '../assets/25.png';
import curlDeskLeft from '../assets/26.png';
import curlDeskRight from '../assets/27.png';
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom'; // rename accordingly

import { IoArrowForwardOutline } from 'react-icons/io5';

const Landing = () => {
  const [showGrid, setShowGrid] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [animationState, setAnimationState] = useState('initial');
  const [showPopup, setShowPopup] = useState(false);
  const [showDesktopCurls, setShowDesktopCurls] = useState(false);
  const [curlsExited, setCurlsExited] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [starPositions] = useState(() =>
    Array.from({ length: 25 }, () => ({
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 90 + 5}%`,
      animationDelay: `${Math.random() * 2}s`
    }))
  );
  
  const [time, setTime] = useState('');
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
        className="hidden sm:flex absolute top-0 right-0 z-40 px-3 py-2 text-white/90 items-center space-x-7 text-sm rounded-bl-xl"
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
  
  
  
  
  
  
  
  
  // Top of Landing.jsx


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
    setAnimationState('transitioning'); // Reuse same transition logic
    setTimeout(() => {
      setCurlsExited(false); // bring curls back if needed
      setAnimationState('initial');
    }, 500);
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
<div className="w-full h-screen overflow-y-auto overflow-x-hidden bg-black text-white font-sans flex items-center justify-center relative">

      {/* Background Image */}
      <img
        src={windowWidth >= 640 ? landingDesktop : landingMob}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
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
  className="absolute top-0 left-0 w-full flex flex-col items-center px-4 z-20 pt-32 sm:pt-40 md:pt-20 lg:pt-20 text-center"


>



        <h1 className="text-lg md:text-4xl md:mt-10 lg:text-3xl mt-3 sm:mt-4  bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text ">
  Start Hosting Your Events.
</h1>
<p className="hidden lg:block  lg:text-md  mt-6 leading-relaxed max-w-2xl mx-auto text-white/90">
  Create and join organizations, Host events and sell tickets to your guests.<br />
  Happy tiqz!
</p>

<p className="text-sm lg:hidden lg:text-lg mt-2 md:text-xl md:mt-4 leading-relaxed max-w-2xl mx-auto text-white/90 ">
  Create and join organizations, Host events and sell tickets to your guests. Happy tiqz!
</p>


<button
  onClick={handleGetHosting}
  className="lg:mt-8 md:mt-8 lg:px-5 lg:py-3 px-8 py-2 md:px-12 md:py-4 mt-4 rounded-full border-2 border-[#535456] bg-[#212226]  text-lg relative hover:scale-105 transition-all duration-300"
>
  <span className="bg-gradient-to-b md:text-xl from-white to-gray-400 text-transparent bg-clip-text font-semibold">
    Get Hosting
  </span>
  {/* Top white inner shadow only */}
  
</button>



      </motion.div>

      {/* Mike Image */}
      <motion.img
  src={"https://res.cloudinary.com/dzzhbgbnp/image/upload/v1746358882/mike_svg_rzzkks.svg"}
  alt="mike"
  className={`mx-auto z-30 ${
    windowWidth < 640 ? 'w-40 mt-5' : 'sm:w-60 sm:mt-60'
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
{windowWidth >= 640 && window.innerHeight > 500 && showDesktopCurls && !curlsExited && (
  <>
    {/* Left curl */}
    <motion.img
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        animationState === 'transitioning'
          ? { x: -500, opacity: 0 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      src={curlDeskLeft}
      alt="desktop-left-curl"
      className="absolute lg:top-[40%] md:mr-[45%] lg:mr-[20%] lg:w-[25vw] md:w-[65vw] lg:max-w-[700px] transform -translate-x-[120%] -translate-y-1/2 rotate-[60deg] z-10"
    />

    {/* Right curl */}
    <motion.img
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        animationState === 'transitioning'
          ? { x: 500, opacity: 0 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
      src={curlDeskRight}
      alt="desktop-right-curl"
      className="absolute lg:top-[30%] md:top-[50%] md:w-[65vw] md:ml-[50%] lg:ml-[20%] lg:w-[25vw] lg:max-w-[700px] transform translate-x-[80%] -translate-y-1/2 rotate-[120deg] z-10"
    />
  </>
)}



    
    

      {/* Bottom Message */}
      {animationState === 'initial' && (
  <div className="absolute bottom-10 sm:bottom-0 w-full z-30 pointer-events-none">
    <div
      className="text-center py-6"
      style={{
        background: 'linear-gradient(to top, rgba(2,3,8,0.8), transparent)',
      }}
    >
      {/* Your content here */}
    </div>
  </div>
)}





{/* Tagline Section */}




      {/* Popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md text-white flex flex-col justify-center items-center w-full h-full"
        >
          <button
            onClick={handleClosePopup}
            className="absolute top-4 right-4 w-10 h-10 text-2xl text-gray-400 z-50"
          >
            ×
          </button>
          <div className="w-full h-full px-6 py-10 flex flex-col justify-center items-center">
            <div className="w-full">
              <img src={logo} alt="Logo" className="w-6 h-6 mb-6 mx-auto" />
              <h2 className="text-2xl font-semibold text-center mb-2">Welcome to Snaptiqz</h2>
              <p className="text-lg text-gray-300 text-center mb-8 px-4">
                Thank you for signing up. Begin your hosting journey here by creating an account.
              </p>
              <div className="relative w-full max-w-md mx-auto mb-6">
                <input
                  type="email"
                  placeholder="account email"
                  className="w-full px-5 py-3 pr-10 bg-[#1e1e1e] rounded-full border border-gray-700 text-white text-lg focus:outline-none"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
                  <IoArrowForwardOutline className="text-white text-lg" />
                </div>
              </div>
              <button
  onClick={() => navigate('/welcome')}
  className="w-full max-w-md mx-auto flex items-center justify-center gap-2 bg-black text-white rounded-full py-3 font-medium border border-gray-800 hover:bg-gray-700 transition"
>
  <img src={google} alt="G" className="w-5 h-5" />
  Sign Up with Google
</button>

            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Landing;
