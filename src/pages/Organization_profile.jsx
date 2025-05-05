import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiClock, FiTrash2, FiStar, FiDollarSign, FiArrowLeft, FiUser,  } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa'; 
import { BiQrScan } from 'react-icons/bi';
import bgImage from '../assets/org_dashboard.svg';
import logo from '../assets/logo.svg';
import avatar from '../assets/avatar.svg';

const Organization_profile = () => {
  const navigate = useNavigate();

return (
    <div
        className="min-h-screen w-full bg-cover bg-center text-white relative flex flex-col"
        style={{ backgroundImage: `url(${bgImage})`, backgroundColor: '#020308' }}
    >
         <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>
        <div className="p-6 flex-grow">
            {/* Back Button */}
            <button onClick={() => navigate(-1)} className="mb-4">
                <FiArrowLeft className="text-white text-xl" />
            </button>

            <img src={logo} alt="Logo" className="w-8 mb-4" />
            <h2 className="text-xl font-semibold mb-6">Settings</h2>

            {/* User Profile */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full" />
                    <div>
                        <p className="text-lg font-medium">Default Name</p>
                        <p className="text-sm text-gray-400">Add Description</p>
                    </div>
                </div>
                <div className="w-16 h-16  rounded-full flex items-center justify-center">
                    <FaQrcode className='w-8 h-8' />
                </div>
            </div>

            {/* Role Switching */}
            <div className="mb-6">
                <p className="text-sm text-gray-300 mb-4">Switch My Role</p>
                <div className="flex gap-3 mb-6">
                    <button className="flex-1 border border-white py-5 rounded-lg bg-white text-black flex items-center justify-center gap-2">
                        <FiUser /> Organizer
                    </button>
                    <button className="flex-1 border border-white py-5 rounded-lg text-white flex items-center justify-center gap-2">
                        <FiUser /> Delegate
                    </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">You are currently an Organizer</p>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-4 text-base">
                <button className="flex items-center gap-3 text-left">
                    <FiLock /> Privacy
                </button>
                <button className="flex items-center gap-3 text-left" onClick={() => navigate('/history')}>
                    <FiClock /> History
                </button>
                <button className="flex items-center gap-3 text-left">
                    <FiTrash2 /> Deleted Certificates
                </button>
                <button className="flex items-center gap-3 text-left">
                    <FiStar /> Favorite Delegates
                </button>
                <button className="flex items-center gap-3 text-left">
                    <FiDollarSign /> Revenue
                </button>
            </div>
        </div>

        <footer className="p-4 mt-auto">
            <p className="text-sm text-gray-500 text-center">
                Powered by <span className="font-semibold">Snaptiqz</span>
            </p>
        </footer>
        </div>
   )

};

export default Organization_profile;
