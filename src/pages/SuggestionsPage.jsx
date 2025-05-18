import React, { useState,useContext } from 'react';
import gridBg from "../assets/Grid_mob.svg";
import logo from '../assets/logo.svg';
import avatar from '../assets/avatar.svg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const SuggestionsPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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
    

      <img src={logo} alt="Logo" className="w-8 h-8 mt-6 self-start ml-6" />

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

      {step === 1 && (
        <div className="flex flex-col items-center mt-20">
          <p className="text-xl sm:text-2xl mb-6">Let’s Set up your Profile</p>
          <div className="relative w-24 h-24 mb-4">
            <img
              src={user?.image || avatar}
              alt="Avatar"
              className="rounded-full w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              ✎
            </div>
          </div>
          <input
            type="text"
            placeholder="My Name"
            className="bg-transparent border border-gray-500 rounded-lg px-4 py-2 mb-6 w-64 text-center placeholder-gray-400"
          />
          <button
            onClick={() => setStep(2)}
            className="bg-white text-black px-6 py-2 rounded-full"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-md px-6 mt-6 flex flex-col gap-6 mb-10">
          <div className="flex justify-between items-center">
            <p className="text-base ">Choose The Types of Events you're Interested in</p>
            <button
  className="text-sm border border-zinc-50 rounded-lg px-5 py-1 text-gray-400"
  onClick={() => navigate('/dashboard')}
>
  Skip
</button>

          </div>

          <div className="grid grid-cols-3 gap-3">
            {Array(9).fill(null).map((_, i) => (
              <div key={i} className="border border-gray-500 h-14 rounded-md"></div>
            ))}
          </div>

          <div>
            <p className="text-white text-sm font-semibold mb-1">Discover Organizations.</p>
            <p className="text-gray-400 text-xs">
              You can join organizations and get notified on the events hosted by them and more
            </p>
          </div>

          <div>
            <p className="text-white text-sm font-semibold mb-2">Trending Right Now</p>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4 cursor-grab active:cursor-grabbing">


              {[1, 2].map((item) => (
                <div key={item} className="bg-[#0d0d12] rounded-lg p-4 w-48 flex-shrink-0">
                  <img src={avatar} className="rounded-full mx-auto mb-2" alt="Org" />
                  <p className="text-center text-xs font-semibold">Organization Name</p>
                  <p className="text-center text-gray-400 text-xs mb-2">22k Followers</p>
                  <button className="bg-white text-black w-full py-1 rounded-full text-sm">Follow</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white text-sm font-semibold mb-2">Popular Hosts</p>
            <div className="flex gap-4 overflow-x-auto">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex flex-col items-center w-28">
                  <img src={avatar} className="rounded-full mb-1" alt="Host" />
                  <p className="text-xs text-center">Organization Name</p>
                  <button className="bg-white text-black mt-1 px-2 py-1 text-xs rounded-full">Follow</button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => alert('Dashboard Setup Complete')}
            className="bg-white text-black px-6 py-2 rounded-full self-center mt-5"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SuggestionsPage;
