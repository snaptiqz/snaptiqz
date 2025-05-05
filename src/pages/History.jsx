import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/org_dashboard.svg';
import ticket_cover from '../assets/ticket_cover.png';
import { FaClock, FaCalendarAlt, FaMapMarkerAlt, } from 'react-icons/fa';
import { Star } from 'lucide-react'; 
import { AiOutlineArrowLeft } from 'react-icons/ai'; 
// Correct import for Lucide Star icon


const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const History = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const selectedMonth = monthNames[currentDate.getMonth()];
  const selectedYear = currentDate.getFullYear();
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle button click and navigate to the organizer profile
  const handleClick = () => {
    navigate('/organization_profile'); // Adjust the URL path based on your app structure
  };
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay(); // 0 = Sunday, 6 = Saturday
  };

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
      const hasDot = [21, 22].includes(i); // Example: mark specific days
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
        className="min-h-screen text-white p-6 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
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
        <div className="max-w-md mx-auto p-2 rounded-xl">
            <div className="flex items-center mb-4">
            <button onClick={handleClick} className="px-2 py-1">
            <AiOutlineArrowLeft size={16} />
    </button>
                <h1 className="text-lg font-semibold flex-1 text-center">History</h1>
            </div>

            <div className="flex gap-2 mb-5">
            <button className="flex items-center justify-center gap-1 flex-1 bg-[#19191F] px-4 py-2 rounded-lg text-sm">
  <Star
    size={16}
    className="text-gray-400 hover:text-white transition-all duration-300"

  />
  Events
</button>
                <button className="flex-1 text-gray-400 text-sm px-4 py-2 rounded-lg text-center">
                    Past Delegates<br />and Volunteers
                </button>
            </div>

            {/* Calendar */}
            <div className="bg-white text-black rounded-lg mb-5 overflow-hidden">
                <div className="flex justify-between items-center px-4 py-2 border-b">
                    <button onClick={() => handleMonthChange(-1)} className="text-gray-500 px-2">‹</button>
                    <div className="text-center flex items-center gap-2 font-semibold">
                        {selectedMonth} {selectedYear}
                    </div>
                    <button onClick={() => handleMonthChange(1)} className="text-gray-500 px-2">›</button>
                </div>

                <div className="grid grid-cols-7 px-4 py-2">
                    {generateCalendarDays()}
                </div>
            </div>

            {/* Event Cards */}
            {[1, 2].map((_, index) => (
  <div key={index} className="bg-[#19191F] p-4 rounded-xl mb-4">
    <div className="flex justify-between">
      {/* Left Column - Event Details */}
      <div className="flex-1 min-w-0 pr-4">
        <p className="font-semibold">Event Name</p>

        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <FaClock className="w-4 h-4 text-gray-400" />
          <p>8:00 to 10:00 PM</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <FaCalendarAlt className="w-4 h-4 text-gray-400" />
          <p>25 April 2025</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
          <p>Location: To be announced</p>
        </div>

        <div className="text-xs text-gray-500 mt-2">
          Description of the event according to what the user typed in along with tags
        </div>
      </div>

      {/* Right Column - Event Type & Actions */}
      <div className="w-28 flex flex-col justify-between items-end">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          Public Event
        </div>

        <div className="w-full h-16 rounded overflow-hidden mb-2">
          <img
            src={ticket_cover}
            alt="ticket"
            className="object-cover w-full h-full"
          />
        </div>

        <button className="text-xs bg-[#2E2E2E] border-gray-400 px-3 py-2 rounded w-full">
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
