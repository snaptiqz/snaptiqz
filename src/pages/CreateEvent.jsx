import React, { useState, useRef, useEffect,useMemo } from 'react';
import bgImage from '../assets/org_dashboard.svg';
import defaultPoster from '../assets/default_poster.svg';
import gridBg from '../assets/Grid_mob.svg';
import avatar from '../assets/avatar.svg';
import avatarImage from '../assets/avatar.svg';
import DatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import Select from 'react-select';
import timezoneList from '../data/timezones.json'; 
import PhotonLocationInput from '../components/PhotonLocationInput';
import "react-datepicker/dist/react-datepicker.css";
import {  MapPin,  LaptopMinimal,  Tags, Users, Earth, Plus, Image as ImageIcon, Clock, ChevronDown, ChevronRight, LogIn, Globe, Text, ScanFace, Lock, X, Check, Upload, UserPlus, Pen, Ticket } from 'lucide-react';
import axios from "axios";
import { toast } from "react-toastify";
import TopNavbar from '../components/TopNavbar';
import StarryBackground from '../components/StarryBackground';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const CreateEvent = () => {
  const [ticketPrice, setTicketPrice] = useState("");
  const [approval, setApproval] = useState(true);
  const [capacity, setCapacity] = useState("");
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [eventVisibility, setEventVisibility] = useState('public');
  const [eventPoster, setEventPoster] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingDraft, setIsSubmittingDraft] = useState(false);
  const [eventPosterPreview, setEventPosterPreview] = useState(defaultPoster);
  const [eventName, setEventName] = useState('Event Name');
  const [isEditingEventName, setIsEditingEventName] = useState(false);
const [eventDescription, setEventDescription] = useState('');
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [start, end] = dateRange;
  const [timeRange, setTimeRange] = useState({ start: "", end: "" });
const [selectedOrganizer, setSelectedOrganizer] = useState("Organizer (Me)");
const [showOrganizerDropdown, setShowOrganizerDropdown] = useState(false);
  const [location, setLocation] = useState('');
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
  const [isVirtual, setIsVirtual] = useState(false);
  const [virtualLink, setVirtualLink] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
const navigate = useNavigate();

  const [showAddOrgPopup, setShowAddOrgPopup] = useState(false);
const [newOrgName, setNewOrgName] = useState('');
const [orgImage, setOrgImage] = useState(null);
const [previewUrl, setPreviewUrl] = useState(null);

  const formContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const guestImageInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const organizerDropdownRef = useRef(null);


  const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#1e1e1e',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '0.875rem',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: '8px',
    zIndex: 50,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#333' : '#1e1e1e',
    color: '#fff',
    cursor: 'pointer',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#fff',
  }),
  input: (base) => ({
    ...base,
    color: '#fff',
  }),
};

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      organizerDropdownRef.current &&
      !organizerDropdownRef.current.contains(event.target)
    ) {
      setShowOrganizerDropdown(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

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

  const buildISODateTime = (date, time) => {
  if (!date || !time) return null;
  const [hours, minutes] = time.split(":");
  const result = new Date(date);
  result.setHours(parseInt(hours, 10), parseInt(minutes, 10));
  return result.toISOString();
};

  // Handle event poster upload
 const handlePosterUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEventPoster(reader.result); // Base64 string
      setEventPosterPreview(reader.result);
    };
    reader.readAsDataURL(file); // converts to base64 string
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

  const resetForm = () => {
  setEventName('Event Name');
  setEventDescription('');
  setEventPoster(null);
  setEventPosterPreview(defaultPoster);
  setDateRange([null, null]);
  setTimeRange({ start: '', end: '' });
  setTimezone('Asia/Kolkata');
  setIsVirtual(false);
  setLocation('');
  setVirtualLink('');
  setCapacity('');
  setTicketPrice('');
  setApproval(true);
  setGuests([]);
  setTags([]);
  setTagInput('');
  setShowTagInput(false);
  setSelectedOrganizer('Organizer (Me)');
  setEventVisibility('public');
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

  const handleSubmit = async (status = "PUBLISHED") => {
  const isDraft = status === "DRAFT";
  isDraft ? setIsSubmittingDraft(true) : setIsSubmitting(true);

  try {
    const combinedStart = buildISODateTime(start, timeRange.start) || new Date().toISOString();
    const combinedEnd = buildISODateTime(end, timeRange.end) || new Date().toISOString();
    const safeCapacity = capacity && !isNaN(parseInt(capacity)) ? parseInt(capacity) : null;

    const payload = {
      name: eventName || "",
      description: eventDescription || "",
      status,
      image: eventPoster || "", // base64 string
      isRegistrationOpen: true,
      showGuestList: true,
      organizationId: "zj7e63pbtcmbrwg3s9jej73z", // hardcoded or dynamic
      eventType: isVirtual ? "online" : "offline",
      eventUrl: null,
      virtualLink: isVirtual ? virtualLink || "" : null,
      location: !isVirtual ? location || "" : null,
      timezone: timezone || "",
      tags: tags.length ? tags : [""],
      isPublic: eventVisibility === "public",
      hosts: selectedOrganizer || "",
      startDate: combinedStart,
      endDate: combinedEnd,
      maxAttendees: safeCapacity,
      tickets: [
        {
          name: "General",
          description: "",
          price: ticketPrice ? Number(ticketPrice) : 0,
          currency: "INR",
          isPaid: !!ticketPrice,
          quantity: safeCapacity,
          isActive: true,
          isApprovalRequired: approval,
          saleStartTime: null,
          saleEndTime: null,
          metadata: "",
          benefits: [""],
        },
      ],
      formFields: [],
      teamMembers: [],
    };

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/events/create`, payload);
    console.log("✅ Event created:", res.data);

    toast.success("Event created successfully!",{ icon: false });
    resetForm();
  } catch (error) {
    console.error("❌ Event creation failed:", error.response?.data || error.message);
    toast.error("Failed to create event.",{ icon: false });
  } finally {
  isDraft ? setIsSubmittingDraft(false) : setIsSubmitting(false);
  if (!isDraft) {
    setShowSpinner(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2500);
  }
}
};


 if (showSpinner) return <Spinner />;
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
        className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-3/4 w-[120vw] sm:w-[60vw] max-w-none opacity-80 pointer-events-none z-0"
      />

    
  
      {/* Background Image with Stars */}
      <img
  src={bgImage}
  alt="Background"
  className="fixed top-0 left-0 w-screen h-screen object-cover z-0 opacity-80"
/>
  <TopNavbar scrollRef={formContainerRef} />


      <StarryBackground count={60}/>

      {/* Form Container with Scroll */}
      <div 
        ref={formContainerRef}
        className="relative z-10 w-full max-w-md mx-auto px-6 py-24 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-hide"
      >
        
        {/* Poster */}
        <div className="relative w-full rounded-xl overflow-hidden bg-white/5 border border-white/20 mb-8 group hover:border-white/40 transition">
          <img 
  src={eventPosterPreview} 
  alt="Event Poster" 
  className="w-full h-28 object-contain bg-black" 
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
              <Upload size={16} /> Upload Event Poster
            </button>
          </div>
        </div>

       
        <div className="space-y-6">
          <div className="flex gap-3 mb-6">
  {/* Organizer Dropdown */}
  <div className="flex-1 relative" ref={organizerDropdownRef}>
    <button
      onClick={() => setShowOrganizerDropdown(!showOrganizerDropdown)}
      className="w-full h-[64px] px-4 py-2 bg-[#2b2b2b] border border-white/20 rounded-xl flex items-center justify-between text-sm text-white"
    >
      <div className="flex items-center gap-3">
        <ScanFace size={20} />
        <div className="leading-tight text-left">
          <div className="text-sm font-medium">Organizer</div>
          <div className="text-xs opacity-70">(Me)</div>
        </div>
      </div>
      <ChevronDown size={16} />
    </button>

    {showOrganizerDropdown && (
      <div className="absolute left-0 mt-2 w-full bg-[#2b2b2b] border border-white/20 rounded-xl shadow-xl z-30 text-sm">
        <button
          onClick={() => {
            setSelectedOrganizer("Organizer (Me)");
            setShowOrganizerDropdown(false);
          }}
          className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/10"
        >
          <ScanFace size={18} />
          Organizer (Me)
        </button>
          <div className="border-t border-white/30 " />
        <button
          onClick={() => {
            setSelectedOrganizer("Organization Name");
            setShowOrganizerDropdown(false);
          }}
          className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/10 text-blue-400"
        >
          <ScanFace size={18} />
          Organization Name
        </button>
          <div className="border-t border-white/30 " />
     <button
  onClick={() => {
    setShowOrganizerDropdown(false);
    setTimeout(() => setShowAddOrgPopup(true), 0); 
  }}
  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/10"
>
  <Plus size={18} />
  Add New Organization
</button>



      </div>
    )}
  </div>


    <div className="flex-1 relative" ref={dropdownRef}>
      <button
        onClick={() => setShowVisibilityDropdown(!showVisibilityDropdown)}
        className="w-full h-[64px] px-4 py-2 bg-[#2b2b2b] border border-white/20 rounded-xl flex items-center justify-between text-sm text-white"
      >
        <div className="flex items-center gap-3">
          {eventVisibility === 'public' ? <Earth size={20} /> : <Lock size={20} />}
          <span className="text-sm font-medium">{eventVisibility === 'public' ? 'Public' : 'Private'}</span>
        </div>
        <ChevronDown size={16} />
      </button>

     {showVisibilityDropdown && (
  <div className="absolute right-0 mt-2 w-full bg-[#2b2b2b] border border-white/20 rounded-xl shadow-lg z-30 text-sm">
    <button
      onClick={() => {
        setEventVisibility("public");
        setShowVisibilityDropdown(false);
      }}
      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/10"
    >
      <Earth size={16} /> Public
    </button>

    {/* Divider */}
    <div className="border-t border-white/30 " />

    <button
      onClick={() => {
        setEventVisibility("private");
        setShowVisibilityDropdown(false);
      }}
      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/10"
    >
      <Lock size={16} /> Private
    </button>
  </div>
)}
    </div>
  </div>


         <div className="flex items-center gap-3 mb-4 max-w-full px-2">
  {isEditingEventName ? (
    <>
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        autoFocus
        className="text-3xl font-semibold bg-transparent border-b border-white/30 outline-none focus:border-white/70 transition w-full max-w-[250px]"
      />
      <Check
        size={22}
        className="text-white cursor-pointer hover:text-green-500 transition"
        onClick={() => setIsEditingEventName(false)}
      />
    </>
  ) : (
    <>
      <h1 className="text-3xl font-semibold truncate max-w-[250px]">{eventName}</h1>
      <Pen
        size={24}
        className="text-white/70 cursor-pointer"
        onClick={() => setIsEditingEventName(true)}
      />
    </>
  )}
</div>

            {/* Date & Time Section */}
        <div className="space-y-2">
 

  {/* Display Box */}
  <div
    onClick={() => setShowPicker(true)}
    className="flex items-start gap-3 p-4 rounded-xl bg-[#2B2B2B] border border-white/20 cursor-pointer hover:bg-white/20 transition"
  >
    <Clock className="text-white/70 mt-1" size={20} />
    <div className="text-sm leading-snug">
      <div className="font-medium text-white">
        {start
          ? format(start, "EEEE, MMMM d yyyy")
          : "Select event date"}
      </div>
      <div className="text-white/70">
        {timeRange.start && timeRange.end
          ? `${timeRange.start} to ${timeRange.end} GMT +5:30`
          : "Select time range"}
      </div>
    </div>
  </div>

  {/* Popup Picker */}
 {showPicker && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
    <div className="bg-black border border-white/20 rounded-xl shadow-2xl p-5 w-full max-w-md mx-auto">
      {/* Title with Clock Icon */}
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-white/70" />
        <span className="text-white text-sm">Select Date & Time</span>
      </div>

      {/* Date Picker */}
      <DatePicker
  selected={start}
  onChange={(update) => {
    if (Array.isArray(update)) {
      const [startDate, endDate] = update;
      setDateRange([
        startDate,
        endDate ?? startDate  // 👈 if end is null, use start as end
      ]);
    }
  }}
  startDate={start}
  endDate={end}
  selectsRange
  inline
/>

      {/* Time Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={16} />
          <input
            type="time"
            value={timeRange.start}
            onChange={(e) =>
              setTimeRange({ ...timeRange, start: e.target.value })
            }
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-sm text-white"
            placeholder="Start Time"
          />
        </div>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={16} />
          <input
            type="time"
            value={timeRange.end}
            onChange={(e) =>
              setTimeRange({ ...timeRange, end: e.target.value })
            }
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-sm text-white"
            placeholder="End Time"
          />
          {/* Timezone Selector */}






        </div>
        <div className="mt-4">
  <label className="block text-white/70 text-sm mb-2">Select Timezone</label>
  <Select
    options={timezoneList}
    value={timezoneList.find((tz) => tz.value === timezone)}
    onChange={(selected) => setTimezone(selected.value)}
    styles={customStyles}
    placeholder="Search or select timezone"
    isSearchable
  />
</div>
      </div>

      {/* Done Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setShowPicker(false)}
          className="text-sm text-black bg-white px-5 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Done
        </button>
      </div>
    </div>
  </div>
)}

</div>


          {/* Location Section */}
         <div className="space-y-3">


  {/* Toggle Button Group */}
  <div className="flex gap-0 bg-[#2b2b2b] overflow-hidden rounded-xl border border-white/20 w-full">
    {/* Offline Tab */}
   <button
      onClick={() => setIsVirtual(false)}
      className="flex-1  text-white"
    >
      <div
        className={`m-1 rounded-lg px-4 py-3 flex items-start gap-3 transition ${
          !isVirtual ? "bg-[#181818]" : ""
        }`}
      >
        <MapPin size={16} className="mt-1" />
        <div className="text-left">
          <div className="text-sm font-medium">Add Event Location</div>
          <div className="text-xs text-white/70">Offline Location</div>
        </div>
      </div>
    </button>

    {/* Virtual Tab */}
    <button
      onClick={() => setIsVirtual(true)}
      className="flex-1 bg-transparent text-white"
    >
      <div
        className={`m-1 rounded-lg px-4 py-3 flex items-start gap-3 transition ${
          isVirtual ? "bg-[#181818]" : ""
        }`}
      >
        <LaptopMinimal size={16} className="mt-1" />
        <div className="text-left">
          <div className="text-sm font-medium">Add Virtual Link</div>
          <div className="text-xs text-white/70">Virtual Event</div>
        </div>
      </div>
    </button>
  </div>

  {/* Input Field */}
  {isVirtual ? (
    <div className="relative">
      <LaptopMinimal className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={16} />
      <input
  type="url"
  placeholder="Enter Virtual Link"
  value={virtualLink}
  onChange={(e) => setVirtualLink(e.target.value)}
  className="pl-10 pr-4 py-3 w-full bg-[#2b2b2b] border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:border-white/40"
/>

    </div>
  ) : (
    <div className="relative">
      <PhotonLocationInput location={location} setLocation={setLocation} />
    </div>
  )}
</div>


          {/* Description */}
         <div className="space-y-2">
  <div className="relative">
    <div className="absolute left-3 top-2.5 text-white">
      <Text size={16} />
    </div>
   <textarea
  rows={4}
  placeholder="Add a description about the event"
  value={eventDescription}
  onChange={(e) => setEventDescription(e.target.value)}
  className="pl-10 pr-3 py-2 w-full bg-[#2b2b2b] border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40 resize-none text-white"
/>

  </div>
</div>


          {/* Tags Section */}
          <div className="space-y-3">
           
            
            {/* Tag Input Field */}
           {showTagInput ? (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
                    <Tags size={16} />
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
                  <Check size={16} />
                </button>
                <button 
                  onClick={() => setShowTagInput(false)}
                  className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button 
                className="flex items-center justify-center gap-2 w-full bg-[#2b2b2b] px-4 py-3 rounded-lg text-sm border border-white/20 hover:bg-white/10 transition"
                onClick={() => setShowTagInput(true)}
              >
                <Plus size={16} /> Add Tags
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
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guests Section */}
          <div className="space-y-3">
           
            <button 
              className="flex items-center justify-center gap-2 w-full bg-[#2b2b2b] px-4 py-3 rounded-lg text-sm border border-white/20 hover:bg-white/10 transition"
              onClick={() => setShowGuestModal(true)}
            >
              <UserPlus size={16} /> Add Guests
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
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          

          {/* Ticket Type */}
        <div className="space-y-4">
  <label className="text-sm text-white/80 block">Event Details</label>

  {/* Event Detail Card */}
  <div className="rounded-xl bg-[#2b2b2b] p-2 divide-y divide-white/10">
    
    {/* Tickets */}
    <div
      onClick={() => setShowPriceModal(true)}
      className="flex items-center justify-between px-3 py-3   transition cursor-pointer"
    >
      <div className="flex items-center gap-3 text-white">
        <Ticket size={16} />
        <span className="text-sm">Tickets</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-white/70">
        {ticketPrice ? `₹${ticketPrice}` : 'Free'}
        <ChevronRight size={14} className="text-white/40" />
      </div>
    </div>

    {/* Approval Toggle */}
    <div
      onClick={() => setApproval(!approval)}
      className="flex items-center justify-between px-3 py-3  transition cursor-pointer"
    >
      <div className="flex items-center gap-3 text-white">
        <LogIn size={16} />
        <span className="text-sm">Approval for Entry</span>
      </div>

      <div
        className={`w-14 h-6 rounded-full flex items-center justify-between px-1 text-xs font-semibold ${
          approval ? "bg-white text-black" : "bg-white/30 text-white/70"
        } transition-all relative`}
      >
        <span>{approval ? "ON" : ""}</span>
        <span>{!approval ? "OFF" : ""}</span>
        <div
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-black transition-transform ${
            approval ? "translate-x-8" : "translate-x-0"
          }`}
        />
      </div>
    </div>

    {/* Capacity */}
    <div
      onClick={() => setShowCapacityModal(true)}
      className="flex items-center justify-between px-3 py-3   transition cursor-pointer"
    >
      <div className="flex items-center gap-3 text-white">
        <Users size={16} />
        <span className="text-sm">Total Capacity</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-white/70">
        {capacity || 'Unlimited'}
        <ChevronRight size={14} className="text-white/40" />
      </div>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="space-y-2 pt-2">
 <button
  className={`w-full py-3 rounded-xl font-semibold transition ${
    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100'
  }`}
  disabled={isSubmitting}
  onClick={() => handleSubmit("PUBLISHED")}
>
  {isSubmitting ? "Creating..." : "Create and Publish"}
</button>

<button
  className={`w-full py-3 rounded-xl font-medium transition ${
    isSubmittingDraft
      ? 'bg-gray-400 text-white/50 cursor-not-allowed'
      : 'bg-[#2b2b2b] text-white border border-white/20 hover:bg-white/10'
  }`}
  disabled={isSubmittingDraft}
  onClick={() => handleSubmit("DRAFT")}
>
  {isSubmittingDraft ? "Saving..." : "Save as Draft"}
</button>


  </div>
</div>

        </div>
      </div>
  
      {/* Guest Modal */}
      {showGuestModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70">
          <div className="bg-black border border-white/20 rounded-xl w-full max-w-md p-6 m-4 relative">
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
              <X size={16} />
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
                  <ImageIcon size={14} />
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
      {/* Ticket Price Modal */}
{showPriceModal && (
  <div className="fixed p-4 inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="bg-[#111] border border-white/20 rounded-xl p-6 w-full max-w-sm">
      <h3 className="text-white text-lg font-semibold mb-4">Set Ticket Price</h3>
      <input
        type="number"
        placeholder="₹ Enter Price"
        value={ticketPrice}
        onChange={(e) => setTicketPrice(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white text-sm mb-4"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowPriceModal(false)}
          className="px-4 py-2 text-sm rounded-md bg-white text-black hover:bg-gray-200"
        >
          Save
        </button>
        <button
          onClick={() => setShowPriceModal(false)}
          className="px-4 py-2 text-sm text-white/60 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{/* Capacity Modal */}
{showCapacityModal && (
  <div className="fixed p-4 inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="bg-[#111] border border-white/20 rounded-xl p-6 w-full max-w-sm">
      <h3 className="text-white text-lg font-semibold mb-4">Set Capacity</h3>
      <input
        type="number"
        placeholder="Enter max attendees"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white text-sm mb-4"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowCapacityModal(false)}
          className="px-4 py-2 text-sm rounded-md bg-white text-black hover:bg-gray-200"
        >
          Save
        </button>
        <button
          onClick={() => setShowCapacityModal(false)}
          className="px-4 py-2 text-sm text-white/60 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
{showAddOrgPopup && (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
    <div className="bg-[#1e1e1e] p-6 rounded-xl w-[90%] max-w-sm border border-white/20 text-white space-y-4">
      <h2 className="text-lg font-semibold">Add New Organization</h2>

      {/* Image Upload */}
      <div className="flex flex-col items-center gap-2">
        <img
          src={previewUrl || avatar}
          alt="Organization Logo"
          className="w-20 h-20 object-cover rounded-full border border-white/20"
        />
        <label className="text-xs cursor-pointer text-white hover:underline">
          Upload Logo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setOrgImage(file);
                setPreviewUrl(URL.createObjectURL(file));
              }
            }}
          />
        </label>
      </div>

      {/* Organization Name Input */}
      <input
        type="text"
        value={newOrgName}
        onChange={(e) => setNewOrgName(e.target.value)}
        placeholder="Organization Name"
        className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b] border border-white/20 focus:outline-none text-sm"
      />

      {/* Buttons */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => {
            setShowAddOrgPopup(false);
            setNewOrgName('');
            setPreviewUrl(null);
            setOrgImage(null);
          }}
          className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (newOrgName.trim()) {
              setSelectedOrganizer(newOrgName);
              setShowAddOrgPopup(false);
              setNewOrgName('');
              setPreviewUrl(null);
              setOrgImage(null);
            }
          }}
          className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-sm"
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}


      
    </div>
   

  );
};

export default CreateEvent;