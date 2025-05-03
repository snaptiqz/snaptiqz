import React from 'react';
import ticket from '../assets/ticket.png';
import bgImage from '../assets/org_dashboard.png';
import BottomNavbar from '../components/BottomNavbar';
import logo from '../assets/logo.png';
import { FaPlus } from 'react-icons/fa';

const Org_dashboard = () => {
  return (
    <div className="relative min-h-screen w-full text-white font-sans overflow-hidden bg-black">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="dashboard background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Stars Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(40)].map((_, i) => (
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

      {/* Header */}
      <div className="relative z-20 flex justify-between items-center px-4 py-4 mt-4">
        <img src={logo} alt="Snaptiqz Logo" className="h-5" />
        <div className="flex gap-4 text-sm text-white/80">
          <button>Organizations</button>
          <button>⚙️</button>
        </div>
      </div>

      {/* Main Section */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center text-center mt-20 px-6">
        <h2 className="text-xl font-semibold mb-4">Events</h2>

        {/* Ticket with count bubble */}
        <div className="relative w-22 h-22 mb-4">
          <img src={ticket} alt="ticket" className="w-full h-full" />
          <div className="absolute bottom-3 right-0 bg-[#626262] text-black text-xs font-semibold rounded-md px-2 py-[2px] shadow-sm">
            0
          </div>
        </div>

        <p className="text-gray-300 mb-1">You haven’t hosted any events yet</p>
        <p className="text-sm text-gray-500 mb-6">Let’s create your first</p>

        <div className="flex justify-center w-full">
          <button className="px-6 py-2 rounded-full bg-white/10 border border-white text-white text-sm hover:bg-white/20 transition flex items-center gap-2">
            <FaPlus className="text-white text-sm" />
            Create Event
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar />

      {/* Twinkle Animation Keyframes */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        .animate-twinkle {
          animation: twinkle infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Org_dashboard;
