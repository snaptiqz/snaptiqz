import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/logo.svg';
import avatar from '../assets/avatar.svg';
import gridBg from "../assets/Grid_mob.svg"
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext.jsx';
import StarryBackground from '../components/StarryBackground.jsx';

const Welcome = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const { user,justSignedUp,setJustSignedUp } = useContext(AuthContext);

 useEffect(() => {
  const timer = setTimeout(() => {
    setShowSplash(false);
    setTimeout(() => {
      if (justSignedUp) {
        navigate('/profile-setup');
        setJustSignedUp(false);
sessionStorage.removeItem("justSignedUp");

      } else {
        navigate('/dashboard');
      }
    }, 500);
  }, 2500);

  return () => clearTimeout(timer);
}, [justSignedUp]);

  return (
  <div
        className="min-h-screen w-full text-white bg-[#010205] relative overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at top, rgba(0, 70, 255, 0.1) 0%, transparent 20%)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        {/* Grid Background */}
        <img
          src={gridBg}
          alt="grid background"
          className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-3/4 w-[100vw] sm:w-[60vw] max-w-none opacity-80 pointer-events-none z-0"
        />

      
      {/* Stars */}
        <StarryBackground count={80} />

      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.6; }
          }
          .animate-twinkle {
            animation: twinkle infinite ease-in-out;
          }
        `}
      </style>

      {/* Splash only */}
      <AnimatePresence mode="wait">
        {showSplash && (
         <motion.div
  key="splash"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.6 }}
  className="flex flex-col items-center justify-center h-screen w-full z-10 absolute top-0 left-0"
>

            <img src={logo} alt="Snaptiqz Logo" className="w-8 h-8 mb-8" />
            <motion.img
              src={user?.image || avatar}
              alt="User"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl mb-6"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{ boxShadow: '0 0 40px white' }}
            />
            <h2 className="text-xl font-semibold">
              Hey {user?.name?.split(' ')[0] || 'there'}!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Welcome;
