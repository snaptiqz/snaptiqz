import React, { useState, useRef, useEffect } from 'react';
import bgImage from '../assets/org_dashboard.svg';
import defaultPoster from '../assets/default_poster.svg';
import logo from '../assets/logo.svg';
import avatarImage from '../assets/avatar.svg';
import {
  FaCalendarAlt, FaMapMarkerAlt, FaLink, FaFileAlt, FaTags, FaUsers,
  FaPlus, FaImage, FaClock, FaChevronDown, FaGlobe, FaLock,
  FaTimes, FaCheck, FaUpload, FaUserPlus
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
  const [eventVisibility, setEventVisibility] = useState('public');
  const [eventPoster, setEventPoster] = useState(null);
  const [eventPosterPreview, setEventPosterPreview] = useState(defaultPoster);
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
  
  // Tags state
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  
  // Guests state
  const [guests, setGuests] = useState([]);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestImage, setGuestImage] = useState(null);
  const [guestImagePreview, setGuestImagePreview] = useState(null);
  
  const formContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const guestImageInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowVisibilityDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Handle event poster upload
  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventPoster(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventPosterPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle guest image upload
  const handleGuestImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGuestImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGuestImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Tag functions
  const addTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Guest functions
  const addGuest = () => {
    if (guestName.trim() !== '' && guestEmail.trim() !== '') {
      const newGuest = {
        id: Date.now(),
        name: guestName.trim(),
        email: guestEmail.trim(),
        image: guestImagePreview || avatarImage
      };
      setGuests([...guests, newGuest]);
      setGuestName('');
      setGuestEmail('');
      setGuestImage(null);
      setGuestImagePreview(null);
      setShowGuestModal(false);
    }
  };

  const removeGuest = (guestId) => {
    setGuests(guests.filter(guest => guest.id !== guestId));
  };

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
        className="relative z-10 w-full max-w-md mx-auto px-6 py-24 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Create New Event</h1>

        {/* Poster */}
        <div className="relative w-full rounded-xl overflow-hidden bg-white/5 border border-white/20 mb-8 group hover:border-white/40 transition">
          <img 
            src={eventPosterPreview} 
            alt="Event Poster" 
            className="w-full object-cover h-48" 
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePosterUpload}
              className="hidden"
            />
            <button 
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-white/30 transition"
              onClick={() => fileInputRef.current.click()}
            >
              <FaUpload /> Upload Event Poster
            </button>
          </div>
        </div>

        {/* Form Fields - with consistent spacing */}
        <div className="space-y-6">
          {/* Event Name with Visibility Dropdown */}
          <div className="space-y-2">
            <label className="text-sm text-white/80 block">Event Name*</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your event name"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40 transition"
              />
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="h-full px-4 py-3 bg-black bg-opacity-40 backdrop-blur-sm border border-white/20 rounded-lg flex items-center gap-2 text-sm hover:bg-opacity-50 transition"
                  onClick={() => setShowVisibilityDropdown(!showVisibilityDropdown)}
                >
                  {eventVisibility === 'public' ? (
                    <>
                      <FaGlobe size={14} /> Public
                    </>
                  ) : (
                    <>
                      <FaLock size={14} /> Private
                    </>
                  )}
                  <FaChevronDown size={12} className="ml-1" />
                </button>
                
                {/* Dropdown Menu */}
                {showVisibilityDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-gray-900 border border-white/20 rounded-lg shadow-lg overflow-hidden z-20 w-40">
                    <button 
                      className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-2 text-sm transition"
                      onClick={() => {
                        setEventVisibility('public');
                        setShowVisibilityDropdown(false);
                      }}
                    >
                      <FaGlobe size={14} /> Public
                    </button>
                    <button 
                      className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-2 text-sm transition"
                      onClick={() => {
                        setEventVisibility('private');
                        setShowVisibilityDropdown(false);
                      }}
                    >
                      <FaLock size={14} /> Private
                    </button>
                  </div>
                )}
              </div>
            </div>
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

          {/* Tags Section */}
          <div className="space-y-3">
            <label className="text-sm text-white/80 block">Tags</label>
            
            {/* Tag Input Field */}
            {showTagInput ? (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                    <FaTags />
                  </div>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag"
                    className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                </div>
                <button 
                  onClick={addTag}
                  className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition"
                >
                  <FaCheck />
                </button>
                <button 
                  onClick={() => setShowTagInput(false)}
                  className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <button 
                className="flex items-center justify-center gap-2 w-full bg-white/5 px-4 py-3 rounded-lg text-sm border border-white/20 hover:bg-white/10 transition"
                onClick={() => setShowTagInput(true)}
              >
                <FaPlus /> Add Tags
              </button>
            )}
            
            {/* Tag List */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs"
                  >
                    {tag}
                    <button 
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-300 transition ml-1"
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guests Section */}
          <div className="space-y-3">
            <label className="text-sm text-white/80 block">Guests</label>
            <button 
              className="flex items-center justify-center gap-2 w-full bg-white/5 px-4 py-3 rounded-lg text-sm border border-white/20 hover:bg-white/10 transition"
              onClick={() => setShowGuestModal(true)}
            >
              <FaUserPlus /> Add Guests
            </button>
            
            {/* Guest List */}
            {guests.length > 0 && (
              <div className="mt-2 space-y-2">
                {guests.map((guest) => (
                  <div 
                    key={guest.id} 
                    className="flex items-center justify-between bg-white/10 px-4 py-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={guest.image} 
                        alt={guest.name} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{guest.name}</p>
                        <p className="text-xs text-white/70">{guest.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeGuest(guest.id)}
                      className="text-white/70 hover:text-red-300 transition"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
          <button className="w-full py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition  mb-18">
            Create Event
          </button>
        </div>
      </div>

      {/* Guest Modal */}
      {showGuestModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 border border-white/20 rounded-xl w-full max-w-md p-6 m-4 relative">
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white transition"
              onClick={() => {
                setShowGuestModal(false);
                setGuestName('');
                setGuestEmail('');
                setGuestImage(null);
                setGuestImagePreview(null);
              }}
            >
              <FaTimes />
            </button>
            
            <h3 className="text-lg font-semibold mb-4">Add Guest</h3>
            
            {/* Guest Image Upload */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30">
                  <img 
                    src={guestImagePreview || avatarImage} 
                    alt="Guest" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  className="absolute bottom-0 right-0 bg-white/20 p-1 rounded-full hover:bg-white/30 transition"
                  onClick={() => guestImageInputRef.current.click()}
                >
                  <FaImage size={14} />
                </button>
                <input
                  type="file"
                  ref={guestImageInputRef}
                  accept="image/*"
                  onChange={handleGuestImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/80 block mb-1">Name*</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Guest Name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
                />
              </div>
              
              <div>
                <label className="text-sm text-white/80 block mb-1">Email*</label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="guest@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
                />
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  className="flex-1 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition"
                  onClick={addGuest}
                >
                  Add Guest
                </button>
                <button 
                  className="flex-1 py-3 bg-transparent border border-white/30 rounded-lg font-medium hover:bg-white/5 transition"
                  onClick={() => {
                    setShowGuestModal(false);
                    setGuestName('');
                    setGuestEmail('');
                    setGuestImage(null);
                    setGuestImagePreview(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <BottomNavbar />
    </div>
  );
};

export default CreateEvent;