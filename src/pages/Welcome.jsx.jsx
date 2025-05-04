import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import avatar from '../assets/avatar.svg';
import { FaUserTie, FaUserFriends } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Welcome = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
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

      {/* Splash and Role Selection Logic */}
      <AnimatePresence mode="wait">
        {showSplash ? (
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
            <h2 className="text-xl font-semibold">Hey User!</h2>
          </motion.div>
        ) : (
          <motion.div
            key="roles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center z-10 max-w-md w-full space-y-6"
          >
            <img src={logo} alt="Snaptiqz Logo" className="w-6 h-6 mb-6" />
            <img
              src={avatar}
              alt="User"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
              style={{ boxShadow: '0 0 30px white' }}
            />
            <h2 className="text-xl font-semibold mt-4">Hey User!</h2>
            <p className="text-sm text-gray-300">Who are you operating as today?</p>

            <div className="w-full space-y-4 mt-2">
              <button
                onClick={() => navigate('/org_dashboard')}
                className="w-full flex items-center gap-4 p-4 border border-white rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <FaUserTie className="text-white text-xl" />
                <div className="text-left">
                  <p className="font-semibold text-white">As an organizer</p>
                  <p className="text-xs text-gray-300">Create Events, Invite people, Assign Volunteers and more for free</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/delegate_dashboard')}
                className="w-full flex items-center gap-4 p-4 border border-white rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <FaUserFriends className="text-white text-xl" />
                <div className="text-left">
                  <p className="font-semibold text-white">As a delegate</p>
                  <p className="text-xs text-gray-300">Join Events, Get assigned as Volunteer, Collect Certificates and more</p>
                </div>
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">⚙️ You can switch role options later from the setting menu.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Welcome;
