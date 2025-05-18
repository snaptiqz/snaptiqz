import React,{useMemo} from 'react';
import ticket from '../assets/ticket.svg';
import gridBg from '../assets/Grid_mob.svg';
import BottomNavbar from '../components/BottomNavbar';
import logo from '../assets/logo.svg';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import StarryBackground from '../components/StarryBackground';


const Dashboard = () => {

  const navigate = useNavigate();
  

  return (
   <div
      className="min-h-screen w-full text-white bg-[#010205] relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at top, rgba(0, 70, 255, 0.1) 0%, transparent 20%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <img
              src={gridBg}
              alt="grid background"
              className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-3/4 w-[120vw] sm:w-[60vw] max-w-none opacity-80 pointer-events-none z-0"
            />
      
      
      <TopNavbar /> 
      {/* Stars Layer */}
       <StarryBackground count={80}/>

      
     

      {/* Main Section */}
   <div className="relative z-20 w-full flex flex-col px-6 mt-20">
  {/* Left-aligned heading */}
  <h1 className="text-2xl text-left w-full font-semibold mb-10">Events</h1>

  {/* Centered section below */}
  <div className="flex flex-col items-center justify-center text-center w-full">
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
      <button
        onClick={() => navigate('/create_event')}
        className="px-6 py-2 rounded-full bg-white/10 border border-white text-white text-sm hover:bg-white/20 transition flex items-center gap-2"
      >
        <Plus className="text-white text-sm" />
        Create Event
      </button>
    </div>
  </div>
</div>


     

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

export default Dashboard;
