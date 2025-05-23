import React, { useState, useRef, useEffect,useMemo,useContext } from 'react';
import bgImage from '../assets/org_dashboard.svg';
import defaultPoster from '../assets/ticketdesign1.png';
import gridBg from '../assets/Grid_mob.svg';
import avatar from '../assets/avatar.svg';
import avatarImage from '../assets/avatar.svg';
import DatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import Select from 'react-select';
import timezoneList from '../data/timezones.json'; 
import PhotonLocationInput from '../components/PhotonLocationInput';
import "react-datepicker/dist/react-datepicker.css";
import {  MapPin,RefreshCcw, Image, LaptopMinimal,  Tags, Users, Earth, Plus, Image as ImageIcon, Clock, ChevronDown, ChevronRight, LogIn, Globe, Text, ScanFace, Lock, X, Check, Upload, UserPlus, Pen, Ticket } from 'lucide-react';
import axios from "axios";
import { toast } from "react-toastify";
import TopNavbar from '../components/TopNavbar';
import StarryBackground from '../components/StarryBackground';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { AuthContext } from "../context/AuthContext";
import ticket1 from '../assets/ticketdesign1.png';
import ticket2 from '../assets/ticketdesign2.png';


const CreateEvent = () => {
  const [ticketPrice, setTicketPrice] = useState("");
  const [approval, setApproval] = useState(true);
  const [capacity, setCapacity] = useState("");
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [timezone, setTimezone] = useState("GMT+05:30 — India Standard Time (New Delhi)");
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
  const [start, setStart] = useState(new Date());
const [end, setEnd] = useState(new Date());
  const [timeRange, setTimeRange] = useState({ start: "", end: "" });
const [selectedOrganizer, setSelectedOrganizer] = useState("Organizer (Me)");
const [showOrganizerDropdown, setShowOrganizerDropdown] = useState(false);
const [organizationId, setOrganizationId] = useState("");
  const [posterTemplateIndex, setPosterTemplateIndex] = useState(0);
  const [location, setLocation] = useState('');
  // Tags state
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  
  // speakers state

 
  const [speakerImagePreview, setSpeakerImagePreview] = useState(null);
  const [isVirtual, setIsVirtual] = useState(false);
  const [virtualLink, setVirtualLink] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const templates = [ticket1, ticket2];
const navigate = useNavigate();

  const [showAddOrgPopup, setShowAddOrgPopup] = useState(false);
const [newOrgName, setNewOrgName] = useState('');


  const formContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const speakerImageInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const organizerDropdownRef = useRef(null);
const { createOrganization, useOrganizations } = useContext(AuthContext);
const { data, isLoading } = useOrganizations();
const organizations = data?.items || [];




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


const switchTemplate = () => {
  if (!eventPoster) {
    setPosterTemplateIndex((prev) => (prev + 1) % templates.length);
    setEventPosterPreview(templates[(posterTemplateIndex + 1) % templates.length]);
  }
};



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


  useEffect(() => {
    if (formContainerRef.current) {
      const handleScroll = () => {
        const scrollPosition = formContainerRef.current.scrollTop;
      
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


const handlePosterUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setEventPoster(file); // store the actual File object
    setEventPosterPreview(URL.createObjectURL(file)); // just for preview
  }
};

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
  setTimezone('');
  setIsVirtual(false);
  setLocation('');
  setVirtualLink('');
  setCapacity('');
  setTicketPrice('');
  setApproval(true);
  setSpeakers([]);
  setTags([]);
  setTagInput('');
  setShowTagInput(false);
  setSelectedOrganizer('Organizer (Me)');
  setEventVisibility('public');
};


  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  

 const handleSubmit = async (status = "PUBLISHED") => {
  const isDraft = status === "DRAFT";
  isDraft ? setIsSubmittingDraft(true) : setIsSubmitting(true);

  try {
    const combinedStart = buildISODateTime(start, timeRange.start) || new Date().toISOString();
    const combinedEnd = buildISODateTime(end, timeRange.end) || new Date().toISOString();
    const safeCapacity = capacity && !isNaN(parseInt(capacity)) ? parseInt(capacity) : null;

    const formData = new FormData();
    formData.append("name", eventName || "");
    formData.append("description", eventDescription || "");
    formData.append("status", status);
    formData.append("coverImage", eventPoster); 
    formData.append("isRegistrationOpen", true);
    formData.append("showSpeakerList", true);
    formData.append("organizationId", organizationId || "");
    formData.append("eventType", isVirtual ? "online" : "offline");
    formData.append("eventUrl", null);
    formData.append("virtualLink", isVirtual ? virtualLink || "" : "");
    formData.append("location", !isVirtual ? location || "" : "");
    formData.append("timezone", timezone || "");
    formData.append("isPublic", eventVisibility === "public");
    formData.append("hosts", selectedOrganizer || "");
    formData.append("startDate", combinedStart);
    formData.append("endDate", combinedEnd);
    formData.append("maxAttendees", safeCapacity);

    formData.append("tags", JSON.stringify(tags.length ? tags : [""]));
    formData.append("tickets", JSON.stringify([
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
      }
    ]));
    formData.append("formFields", JSON.stringify([]));
    formData.append("teamMembers", JSON.stringify([]));

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/events/create`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    toast.success("Event created successfully!", { icon: false });
    resetForm();

    if (!isDraft) {
      setShowSpinner(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    }

  } catch (error) {
    console.error("Event creation failed:", error.response?.data || error.message);
    toast.error("Failed to create event.", { icon: false });
  } finally {
    isDraft ? setIsSubmittingDraft(false) : setIsSubmitting(false);
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
  <TopNavbar  />
      <StarryBackground count={60}/>

      {/* Form Container with Scroll */}
      <div 
        ref={formContainerRef}
        className="relative z-10 w-full max-w-md mx-auto px-6 py-24 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-hide"
      >
        
        {/* Poster */}
      

<div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/20 mb-8 group hover:border-white/40 transition">
  <img 
      src={eventPosterPreview ? eventPosterPreview : templates[posterTemplateIndex]} 
    alt="Event Poster" 
    className="w-full h-full object-cover bg-black" 
  />

   <div className="absolute top-2 right-2 flex gap-2 z-10">
    {/* Template Switcher */}
    <button
      onClick={switchTemplate}
      className="bg-white text-black px-3 py-1 text-xs rounded-md flex items-center gap-1 shadow"
    >
      <RefreshCcw size={14} /> 
    </button>

    {/* Image Upload */}
    <input
      type="file"
      ref={fileInputRef}
      accept="image/*"
      onChange={handlePosterUpload}
      className="hidden"
    />
    <button
      className="bg-white text-black px-3 py-1 text-xs rounded-md flex items-center gap-1 shadow"
      onClick={() => fileInputRef.current.click()}
    >
      <Upload size={14} /> Upload Poster
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
    
    {/* Organizer (Me) */}
    <button
      onClick={() => {
        setSelectedOrganizer("Organizer (Me)");
        setOrganizationId("");
        setShowOrganizerDropdown(false);
      }}
      className={`w-full flex items-center gap-2 px-4 py-3 hover:bg-white/10 ${
        selectedOrganizer === "Organizer (Me)" ? "bg-white/10" : ""
      }`}
    >
      <ScanFace size={18} />
      Organizer (Me)
    </button>

    <div className="border-t border-white/30" />

    {/* Organizations */}
    {isLoading ? (
      <div className="px-4 py-3 text-white/60">Loading organizations...</div>
    ) : organizations.length > 0 ? (
      organizations.map((org) => (
        <button
          key={org.id}
          onClick={() => {
            setSelectedOrganizer(org.name);
            setOrganizationId(org.id);
            setShowOrganizerDropdown(false);
          }}
          className={`w-full flex items-center gap-2 px-4 py-3 hover:bg-white/10 ${
            selectedOrganizer === org.name ? "bg-white/10 text-blue-400" : "text-white"
          }`}
        >
          <ScanFace size={18} />
          {org.name}
        </button>
      ))
    ) : (
      <div className="px-4 py-3 text-white/60">No organizations found</div>
    )}

    <div className="border-t border-white/30" />

    {/* Add New Org */}
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
        className="text-3xl font-semibold bg-transparent  outline-none focus:border-white/70 transition w-full max-w-[250px]"
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
 
  <div
    onClick={() => setShowPicker(true)}
    className="flex items-start gap-3 p-4 rounded-xl bg-[#2B2B2B] border border-white/20 cursor-pointer hover:bg-white/10 transition"
  >
    <Clock className="text-white/70 mt-1" size={20} />
    <div className="text-sm leading-snug">
      <div className="font-medium text-white">
        {start ? format(start, "EEE, MMM d yyyy") : "Select event date"}
      </div>
      <div className="text-white/70">
        {timeRange.start && timeRange.end
          ? `${timeRange.start} to ${timeRange.end} ${timezone}`
          : "Select time range"}
      </div>
    </div>
  </div>

  {showPicker && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 w-full max-w-md text-white">
        
    
        <h2 className="text-lg font-semibold mb-4">Event Time</h2>

        {/* Start Time */}
        <div className="grid grid-cols-3 items-center mb-3">
          <label className="text-sm text-white/70 col-span-1">Start</label>
          <div className="col-span-2 grid grid-cols-2 gap-2">
            <DatePicker
              selected={start}
              onChange={(date) => {
                setStart(date);
                if (date > end) setEnd(date); // auto adjust if start > end
              }}
              dateFormat="EEE, MMM d"
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm w-full text-white"
            />
            <input
              type="time"
              value={timeRange.start}
              onChange={(e) =>
                setTimeRange({ ...timeRange, start: e.target.value })
              }
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm w-full text-white"
            />
          </div>
        </div>

        {/* End Time */}
        <div className="grid grid-cols-3 items-center mb-4">
          <label className="text-sm text-white/70 col-span-1">End</label>
          <div className="col-span-2 grid grid-cols-2 gap-2">
            <DatePicker
              selected={end}
              onChange={(date) => setEnd(date)}
              dateFormat="EEE, MMM d"
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm w-full text-white"
            />
            <input
              type="time"
              value={timeRange.end}
              onChange={(e) =>
                setTimeRange({ ...timeRange, end: e.target.value })
              }
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm w-full text-white"
            />
          </div>
        </div>

        {/* Timezone Dropdown */}
        <div className="mb-5">
          <label className="text-sm text-white/70 mb-1 block">Timezone</label>
          <Select
            options={timezoneList}
            value={timezoneList.find((tz) => tz.value === timezone)}
            onChange={(selected) => setTimezone(selected.value)}
            styles={customStyles}
            placeholder="Search or select timezone"
            isSearchable
          />
        </div>

        {/* Done Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowPicker(false)}
            className="bg-white text-black text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-100 transition"
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div className="bg-[#1e1e1e] border border-white/20 rounded-xl p-6 w-full max-w-md space-y-4">
      <h2 className="text-white text-lg font-semibold">Create New Organization</h2>
      <input
        type="text"
        value={newOrgName}
        onChange={(e) => setNewOrgName(e.target.value)}
        placeholder="Organization Name"
        className="w-full px-4 py-2 bg-transparent border border-white/20 text-white rounded-lg placeholder-white/40"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowAddOrgPopup(false)}
          className="px-4 py-2 text-sm text-white bg-white/10 rounded-md"
        >
          Cancel
        </button>
        <button
  onClick={async () => {
    if (!newOrgName.trim()) {
      toast.error("Please enter a valid organization name.");
      return;
    }

    try {
      const res = await createOrganization(newOrgName.trim());
      const { id } = res; // extract the id from API response

      // Set the organization name as label and store the id
      setSelectedOrganizer(newOrgName.trim());
      setOrganizationId(id); // ✅ your setter for the orgId
      setShowAddOrgPopup(false);
      setNewOrgName("");
    } catch (err) {
      console.error("Org creation failed", err);
      toast.error("Could not create organization.");
    }
  }}
  className="px-4 py-2 text-sm bg-white text-black rounded-md"
>
  Create
</button>

      </div>
    </div>
  </div>
)}


      
    </div>
   

  );
};

export default CreateEvent;