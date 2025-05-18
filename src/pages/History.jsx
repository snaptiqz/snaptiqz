import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/org_dashboard.svg';
import gridBg from '../assets/Grid_mob.svg';
import ticket_cover from '../assets/ticket_cover.png';

import {
  Star,
  Clock,
  Calendar,
  MapPin,
  ArrowLeft,
  Globe,
  Sparkle,
  UsersRound
} from 'lucide-react';
import StarryBackground from '../components/StarryBackground';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const History = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const selectedMonth = monthNames[currentDate.getMonth()];
  const selectedYear = currentDate.getFullYear();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/organization_profile');
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
    setCurrentDate(newDate);
  };

  const generateCalendarDays = () => {
    const days = [];
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const daysInMonth = getDaysInMonth(selectedYear, currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(selectedYear, currentDate.getMonth());

    dayNames.forEach(day => {
      days.push(<div key={`header-${day}`} className="text-center text-xs text-gray-400 py-2">{day}</div>);
    });

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="py-2"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const hasDot = [21, 22].includes(i);
      days.push(
        <div key={`day-${i}`} className="text-center py-2 text-sm font-medium relative">
          {i}
          {hasDot && <div className="w-1 h-1 bg-black rounded-full mx-auto mt-1" />}
        </div>
      );
    }

    return days;
  };

  return (
    <div
      className="min-h-screen w-full text-white bg-[#010205] flex flex-col relative"
      style={{
        backgroundImage: `radial-gradient(circle at top, rgba(0, 70, 255, 0.1) 0%, transparent 20%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <img
        src={gridBg}
        alt="grid background"
        className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2 w-[72vw] sm:w-[60vw] max-w-none opacity-70 pointer-events-none z-0"
      />

       <StarryBackground count={60}/>

      <div className="max-w-md mx-auto p-4 pt-10 rounded-xl mb-20">
        <div className="flex items-center mb-4">
          <button onClick={handleClick} className="px-2 py-1">
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center">History</h1>
        </div>

        <div className="flex gap-1 mb-5">
          <button className="flex items-center justify-center gap-1 flex-1 bg-[#0F0F13] px-4 py-4 rounded-lg text-md">
            <Sparkle size={28} className="text-gray-400 hover:text-white transition-all duration-300" />
            Events
          </button>
           <button className="flex items-center justify-center gap-1 flex-1 bg-[#0F0F13] px-4 py-4 rounded-lg text-xm">
            <UsersRound size={28} className="text-gray-400 hover:text-white transition-all duration-300" />
            Past Delegates and Volunteers
          </button>
        </div>

        <div className="bg-[#0F0F13] text-white rounded-lg mb-5 overflow-auto scrollbar-hide">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
            <button onClick={() => handleMonthChange(-1)} className="text-gray-400 px-2">‹</button>
            <div className="text-center flex items-center gap-2 font-semibold">
              {selectedMonth} {selectedYear}
            </div>
            <button onClick={() => handleMonthChange(1)} className="text-gray-400 px-2">›</button>
          </div>

          <div className="grid grid-cols-7 px-4 py-2">
            {generateCalendarDays()}
          </div>
        </div>

        {[1, 2].map((_, index) => (
          <div key={index} className="bg-[#0F0F13] p-4 rounded-xl mb-4">
            <div className="flex justify-between">
              <div className="flex-1 min-w-0 pr-4">
                <p className="font-semibold">Event Name</p>

                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <Clock size={14} />
                  <p>8:00 to 10:00 PM</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <Calendar size={14} />
                  <p>25 April 2025</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <MapPin size={14} />
                  <p>Location: To be announced</p>
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  Description of the event according to what the user typed in along with tags
                </div>
              </div>

              <div className="w-28 flex flex-col justify-between items-end">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <Globe size={14} />
                  Public Event
                </div>

                <div className="w-full h-16 rounded overflow-auto scrollbar-hide mb-2">
                  <img src={ticket_cover} alt="ticket" className="object-cover w-full h-full" />
                </div>

                <button className="text-xs bg-[#1A1A1A] border-gray-800 px-3 py-2 rounded w-full">
                  View in Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
