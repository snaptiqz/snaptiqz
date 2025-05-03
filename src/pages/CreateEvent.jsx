import React, { useState, useRef, useEffect } from 'react';
import bgImage from '../assets/org_dashboard.png';
import defaultPoster from '../assets/default_poster.png';
import logo from '../assets/logo.png';
import {
  FaCalendarAlt, FaMapMarkerAlt, FaLink, FaFileAlt, FaTags, FaUsers,
  FaPlus, FaImage, FaClock, FaChevronDown
} from 'react-icons/fa';
import BottomNavbar from '../components/BottomNavbar';

const CreateEvent = () => {
  const [ticketType, setTicketType] = useState('Free');
  const [ticketPrice, setTicketPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isMultiDay, setIsMultiDay] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  
  const formContainerRef = useRef(null);

  // Handle scroll with proper styling
  useEffect(() => {
    if (formContainerRef.current) {
      const handleScroll = () => {
        const scrollPosition = formContainerRef.current.scrollTop;
        // Additional scroll effects could be added here
      };
      
      formContainerRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (formContainerRef.current) {
          formContainerRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full text-white font-sans overflow-hidden bg-black">
      {/* Background Image with Stars */}
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      />

      {/* Stars Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header - Fixed Position */}
      <div className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-sm border-b border-white/10">
        <img src={logo} alt="Snaptiqz Logo" className="h-6" />
        <div className="flex gap-6 text-sm">
          <button className="hover:text-white text-white/80 transition">Organizations</button>
          <button className="hover:text-white text-white/80 transition">⚙️</button>
        </div>
      </div>

      {/* Form Container with Scroll */}
      <div 
        ref={formContainerRef}
        className="relative z-10 w-full max-w-md mx-auto px-6 py-20 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Create New Event</h1>

        {/* Poster */}
        <div className="relative w-full rounded-xl overflow-hidden bg-white/5 border border-white/20 mb-8 group hover:border-white/40 transition">
          <img src={defaultPoster} alt="Event Poster" className="w-full object-cover h-48" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-white/30 transition">
              <FaImage /> Upload Event Poster
            </button>
          </div>
        </div>

        {/* Form Fields - with consistent spacing */}
        <div className="space-y-6">
          {/* Event Name */}
          <div className="space-y-2">
            <label className="text-sm text-white/80 block">Event Name*</label>
            <input
              type="text"
              placeholder="Enter your event name"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40 transition"
            />
          </div>

          {/* Date & Time Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/80">Date & Time*</label>
              <div className="flex items-center">
                <label className="text-xs mr-2 text-white/70">Multi-day event</label>
                <input 
                  type="checkbox" 
                  checked={isMultiDay}
                  onChange={() => setIsMultiDay(!isMultiDay)}
                  className="w-4 h-4 accent-white/70"
                />
              </div>
            </div>

            {/* Date Selection */}
            <div className={`grid ${isMultiDay ? 'grid-cols-2 gap-4' : 'grid-cols-1'}`}>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                  <FaCalendarAlt />
                </div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
                  placeholder="Start Date"
                />
              </div>
              
              {isMultiDay && (
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                    <FaCalendarAlt />
                  </div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
                    placeholder="End Date"
                  />
                </div>
              )}
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                  <FaClock />
                </div>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
                  placeholder="Start Time"
                />
              </div>
              
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                  <FaClock />
                </div>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
                  placeholder="End Time"
                />
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-3">
            <label className="text-sm text-white/80 block">Location</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                <FaMapMarkerAlt />
              </div>
              <input
                type="text"
                placeholder="Offline Location"
                className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                <FaLink />
              </div>
              <input
                type="url"
                placeholder="Virtual Link (optional)"
                className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm text-white/80 block">Description</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-white/60">
                <FaFileAlt />
              </div>
              <textarea
                rows={4}
                placeholder="Add a description about the event"
                className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40 resize-none"
              />
            </div>
          </div>

          {/* Tags & Guests */}
          <div className="flex gap-4">
            <button className="flex items-center justify-center gap-2 bg-white/5 px-4 py-3 rounded-lg text-sm border border-white/20 hover:bg-white/10 transition flex-1">
              <FaTags /> Tags
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/5 px-4 py-3 rounded-lg text-sm border border-white/20 hover:bg-white/10 transition flex-1">
              <FaUsers /> Add Guests
            </button>
          </div>

          {/* Ticket Type */}
          <div className="space-y-2">
            <label className="text-sm text-white/80 block">Tickets</label>
            <div className="relative">
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="w-full px-4 py-3 appearance-none bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
              >
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
                <FaChevronDown />
              </div>
            </div>
            
            {ticketType === 'Paid' && (
              <div className="relative mt-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">$</span>
                <input
                  type="number"
                  placeholder="Enter Ticket Price"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  className="pl-8 pr-4 py-3 w-full bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
                />
              </div>
            )}
          </div>

          {/* Total Capacity */}
          <div className="space-y-2">
            <label className="text-sm text-white/80 block">Total Capacity</label>
            <input
              type="number"
              placeholder="Enter max number of attendees"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
            />
          </div>

          {/* Create Button */}
          <button className="w-full py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition mt-8 mb-8">
            Create Event
          </button>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default CreateEvent;