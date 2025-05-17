import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/logo.svg';
import avatar from '../assets/avatar.svg';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext.jsx';

const Welcome = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);

      // Delay navigation just a bit to allow splash fade-out
      setTimeout(() => {
        navigate('/Dashboard');
      }, 500); // adjust if needed
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020308] text-white font-sans relative overflow-hidden px-4">
      
      {/* Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: `${Math.random() * 0.4 + 0.2}`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 2}s`,
            }}
          />
        ))}
      </div>

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
            className="flex flex-col items-center z-10"
          >
            <img src={logo} alt="Snaptiqz Logo" className="w-8 h-8 mb-8" />
            <motion.img
              src={avatar}
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
