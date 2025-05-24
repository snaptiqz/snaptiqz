import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Earth, Lock, ChevronDown, Pen, Text
} from 'lucide-react';
import  TopNavbar  from '../components/TopNavbar';
import StarryBackground  from '../components/StarryBackground';
import Spinner  from '../components/Spinner';
import PosterUploader  from '../components/PosterUploader';
import  DateTimePicker  from '../components/DateTimePicker';
import LocationSection  from '../components/LocationSection';
import TagsInput from '../components/TagsInput';
import TicketDetails from '../components/TicketDetails';
import  OrganizerSelector from '../components/OrganizerSelector';
import  {AuthContext } from '../context/AuthContext';
import gridBg from '../assets/Grid_mob.svg';
import defaultPoster from '../assets/ticketdesign1.png';
import ticket1 from '../assets/ticketdesign1.png';
import ticket2 from '../assets/ticketdesign2.png';
import timezoneList from '../data/timezones.json';
import { toast } from 'react-toastify';
import axios from 'axios';
import TemplateSwitcher from '../components/TemplateSwitcher';


const CreateEvent = () => {
  const navigate = useNavigate();
  const { createOrganization, useOrganizations } = useContext(AuthContext);
  const { data, isLoading } = useOrganizations();
  const organizations = data?.items || [];

  const [ticketPrice, setTicketPrice] = useState('');
  const [approval, setApproval] = useState(true);
  const [capacity, setCapacity] = useState('');
  const [timezone, setTimezone] = useState('GMT+05:30 — India Standard Time (New Delhi)');
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
  const [timeRange, setTimeRange] = useState({ start: '', end: '' });
  const [selectedOrganizer, setSelectedOrganizer] = useState('Organizer (Me)');
  const [organizationId, setOrganizationId] = useState('');
  const [posterTemplateIndex, setPosterTemplateIndex] = useState(0);
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [virtualLink, setVirtualLink] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);

  const templates = [ticket1, ticket2];
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const formContainerRef = useRef(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showCapacityModal, setShowCapacityModal] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedFont, setSelectedFont] = useState(null);


  const buildISODateTime = (date, time) => {
    if (!date || !time) return null;
    const [hours, minutes] = time.split(":");
    const result = new Date(date);
    result.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return result.toISOString();
  };

  const switchTemplate = () => {
    if (!eventPoster) {
      const nextIndex = (posterTemplateIndex + 1) % templates.length;
      setPosterTemplateIndex(nextIndex);
      setEventPosterPreview(templates[nextIndex]);
    }
  };

  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventPoster(file);
      setEventPosterPreview(URL.createObjectURL(file));
    }
  };

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleStyleChange = (style) => {
    setSelectedFont(style);
  };


  const handleSubmit = async (status = 'PUBLISHED') => {
  const isDraft = status === 'DRAFT';
  isDraft ? setIsSubmittingDraft(true) : setIsSubmitting(true);

  try {
    const combinedStart = buildISODateTime(start, timeRange.start) || new Date().toISOString();
    const combinedEnd = buildISODateTime(end, timeRange.end) || new Date().toISOString();
    const safeCapacity = capacity && !isNaN(parseInt(capacity)) ? parseInt(capacity) : null;

    const formData = new FormData();
    formData.append("name", eventName);
    formData.append("description", eventDescription);
    formData.append("status", status);
    formData.append("coverImage", eventPoster);
    formData.append("isRegistrationOpen", true);
    formData.append("showSpeakerList", true);
    formData.append("organizationId", organizationId);
    formData.append("eventType", isVirtual ? 'online' : 'offline');
    formData.append("virtualLink", isVirtual ? virtualLink : '');
    formData.append("location", !isVirtual ? location : '');
    formData.append("timezone", timezone);
    formData.append("isPublic", eventVisibility === 'public');
    formData.append("hosts", selectedOrganizer);
    formData.append("startDate", combinedStart);
    formData.append("endDate", combinedEnd);
    formData.append("maxAttendees", safeCapacity);
    formData.append("tags", JSON.stringify(tags));
    formData.append("tickets", JSON.stringify([
      {
        name: 'General',
        price: ticketPrice ? Number(ticketPrice) : 0,
        currency: 'INR',
        isPaid: !!ticketPrice,
        quantity: safeCapacity,
        isActive: true,
        isApprovalRequired: approval,
        saleStartTime: null,
        saleEndTime: null,
        metadata: '',
        benefits: ['']
      }
    ]));
    formData.append("formFields", JSON.stringify([]));
    formData.append("teamMembers", JSON.stringify([]));

    
    console.log('📦 FormData being sent:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/events/create`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
      const eventId = response.data?.id;
      const orgId = organizationId; // use state fallback

if (!eventId || !orgId) {
  toast.error("Missing event or organization ID.");
  return;
}

toast.success("Event created successfully!");
navigate(`/event/${eventId}?orgId=${orgId}`);
   

  } catch (err) {
  console.error("❌ Error creating event:", err.response?.data || err.message);
  toast.error("Failed to create event.");


  } finally {
    isDraft ? setIsSubmittingDraft(false) : setIsSubmitting(false);
  }
};


  if (showSpinner) return <Spinner />;

  return (
    <div className="min-h-screen w-full text-white bg-[#010205] relative overflow-hidden">
      <img src={gridBg} alt="grid background" className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-3/4 w-[120vw] sm:w-[60vw] max-w-none opacity-80 pointer-events-none z-0" />
      <TopNavbar />
      <StarryBackground count={60} />

      <div
        ref={formContainerRef}
        className="relative z-10 w-full max-w-md mx-auto px-6 py-24 h-screen overflow-y-auto scrollbar-hide"
      >
        <PosterUploader
          eventPosterPreview={eventPosterPreview}
          fileInputRef={fileInputRef}
          switchTemplate={switchTemplate}
          handlePosterUpload={handlePosterUpload}
        />
        
       

        <div className="space-y-6">
          <div className="flex gap-3 mb-6">
            <OrganizerSelector
              selectedOrganizer={selectedOrganizer}
              setSelectedOrganizer={setSelectedOrganizer}
              organizationId={organizationId}
              setOrganizationId={setOrganizationId}
              organizations={organizations}
              isLoading={isLoading}
              createOrganization={createOrganization}
            />

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
                  <button onClick={() => { setEventVisibility('public'); setShowVisibilityDropdown(false); }} className="w-full px-4 py-3 hover:bg-white/10 flex items-center gap-2">
                    <Earth size={16} /> Public
                  </button>
                  <div className="border-t border-white/30" />
                  <button onClick={() => { setEventVisibility('private'); setShowVisibilityDropdown(false); }} className="w-full px-4 py-3 hover:bg-white/10 flex items-center gap-2">
                    <Lock size={16} /> Private
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4 max-w-full px-2">
            {isEditingEventName ? (
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                autoFocus
                className="text-3xl font-semibold bg-transparent outline-none w-full max-w-[250px]"
              />
            ) : (
              <>
                <h1 className="text-3xl font-semibold truncate max-w-[250px]">{eventName}</h1>
                <Pen size={24} className="text-white/70 cursor-pointer" onClick={() => setIsEditingEventName(true)} />
              </>
            )}
          </div>

          <DateTimePicker {...{ start, end, setStart, setEnd, timeRange, setTimeRange, timezone, setTimezone, showPicker, setShowPicker, timezoneList }} />
          <LocationSection {...{ isVirtual, setIsVirtual, virtualLink, setVirtualLink, location, setLocation }} />

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
                className="pl-10 pr-3 py-2 w-full bg-[#2b2b2b] border border-white/20 rounded-lg text-sm text-white"
              />
            </div>
          </div>

          <TagsInput {...{ tags, setTags, tagInput, setTagInput, showTagInput, setShowTagInput }} />

         <TicketDetails
  ticketPrice={ticketPrice}
  setTicketPrice={setTicketPrice}
  approval={approval}
  setApproval={setApproval}
  capacity={capacity}
  setCapacity={setCapacity}
  showPriceModal={showPriceModal}
  setShowPriceModal={setShowPriceModal}
  showCapacityModal={showCapacityModal}
  setShowCapacityModal={setShowCapacityModal}
  isSubmitting={isSubmitting}
  isSubmittingDraft={isSubmittingDraft}
  handleSubmit={handleSubmit}
/>

        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
