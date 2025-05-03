import React, { useState } from 'react';
import { FaStar, FaPlus, FaBell, FaUser } from 'react-icons/fa';

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState('favorites');

  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    setActiveTab(path.replace('/', ''));
  };

  const NavButton = ({ icon, path }) => {
    const isActive = activeTab === path.replace('/', '');

    return (
      <button
        onClick={() => navigate(path)}
        className={`relative flex flex-col items-center justify-center p-2 rounded-full transition-all duration-200 ease-in-out ${
          isActive ? 'text-white scale-110' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        {isActive && (
          <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
        )}
        <div className={`relative z-10`}>{icon}</div>
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-white shadow-sm"></div>
        )}
      </button>
    );
  };

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12
      rounded-full z-50 shadow-xl
      border border-white/10 backdrop-blur-lg
      bg-gradient-to-br from-white/10 via-white/5 to-transparent"
    >
      <div className="w-full max-w-md mx-auto flex justify-between px-6 py-3">
        <NavButton icon={<FaStar className="text-xl" />} path="/favorites" />
        <NavButton icon={<FaPlus className="text-xl" />} path="/create_event" />
        <NavButton icon={<FaBell className="text-xl" />} path="/notifications" />
        <NavButton icon={<FaUser className="text-xl" />} path="/profile" />
      </div>

      {/* Optional glowing highlight */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
    </div>
  );
};

export default BottomNavbar;
