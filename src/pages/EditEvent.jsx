import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import TopNavbar from '../components/TopNavbar';
import StarryBackground from '../components/StarryBackground';
import {
  Upload, Pencil, MapPin, Link2, Plus, Undo,
  PenLine,RotateCcw, Image,AlignCenter,AlignLeft, AlignRight,ChevronsUpDown,
  Sparkles,CalendarDays, Globe, UserPlus, Users, HandHeart,Clock,
  RefreshCcw,LaptopMinimal
} from 'lucide-react';
import PhotonLocationInput from '../components/PhotonLocationInput';
import DatePicker from 'react-datepicker';
import Spinner from '../components/Spinner';
import ticket1 from '../assets/ticketdesign1.png';
import ticket2 from '../assets/ticketdesign2.png';
import Select from 'react-select';
import timezoneList from '../data/timezones.json'; 



const EditEvent = () => {
  const { id: eventId } = useParams();
  const [isEditingName, setIsEditingName] = useState(false);
  const [fontFamily, setFontFamily] = useState('Inter');
  const { fetchEventById } = useContext(EventContext);
  const [eventData, setEventData] = useState(null);
  const [posterTemplateIndex, setPosterTemplateIndex] = useState(0);
  const [textAlign, setTextAlign] = useState('right');
  const [showPicker, setShowPicker] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [isVirtual, setIsVirtual] = useState(false);
  const [virtualLink, setVirtualLink] = useState('');
  const [location, setLocation] = useState('');



const [timeRange, setTimeRange] = useState({ start: '', end: '' });
const [timezone, setTimezone] = useState('');
const templates = [ticket1, ticket2];
const currentPoster = templates[posterTemplateIndex];
const [questions, setQuestions] = useState(eventData?.formFields || []);

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
    color: 'white',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#1e1e1e',
    color: 'white',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#333' : '#1e1e1e',
    color: 'white',
  }),
};



const switchTemplate = () => {
  setPosterTemplateIndex((prev) => (prev + 1) % templates.length);
};

const handleAlignChange = (alignment) => {
  setTextAlign(alignment);
};

 useEffect(() => {
  const loadEvent = async () => {
    const data = await fetchEventById(eventId);
    setEventData(data);
    setStart(new Date(data.startDate));
    setEnd(new Date(data.endDate));
    setTimeRange({
      start: new Date(data.startDate).toTimeString().slice(0, 5),
      end: new Date(data.endDate).toTimeString().slice(0, 5),
    });
    setTimezone(data.timezone || 'Asia/Kolkata');

    // Use fetched or fallback to predefined
    if (data.formFields && data.formFields.length > 0) {
      setQuestions(data.formFields.map((q) => ({
        ...q,
        showDropdown: false,
      })));
    } else {
      setQuestions(predefinedQuestions.map((q, i) => ({
        ...q,
        id: Date.now() + i,
        showDropdown: false,
      })));
    }

    if (data.virtualLink?.trim()) {
      setIsVirtual(true);
      setVirtualLink(data.virtualLink);
    } else {
      setIsVirtual(false);
      setLocation(data.location || '');
    }
  };

  loadEvent();
}, [eventId]);



  if (!eventData) return <Spinner />;

  const handleChange = (field, value) => {
    setEventData({ ...eventData, [field]: value });
  };

const addNewQuestion = () => {
  const newQuestion = {
    id: Date.now(),
    label: '',
    required: false,
    showDropdown: false,
  };
  setQuestions([...questions, newQuestion]);
};

const addDOBQuestion = () => {
  const dobQuestion = {
    id: Date.now(),
    label: 'Date of Birth',
    required: true,
    showDropdown: false,
    type: 'date', // optional if you're handling field types later
  };
  setQuestions([...questions, dobQuestion]);
};

const predefinedQuestions = [
  { label: 'Enter Your Full Name.', type: 'Name', required: true },
  { label: 'Enter Your mail ID.', type: 'Email', required: true },
  { label: 'Enter Your Available Phone No.', type: 'Phone', required: false },
];

  return (
    <div className="min-h-screen w-full text-white bg-[#010205] relative overflow-hidden pb-20"
         style={{ backgroundImage: `radial-gradient(circle at top, rgba(0, 70, 255, 0.1) 0%, transparent 20%)` }}>
      <TopNavbar />
      <StarryBackground count={60} />

      <div className="max-w-xl mx-auto px-4 mt-24 space-y-6">
        <div>
         
      <div className="relative mt-1 group">
  {isEditingName ? (
    <input
      autoFocus
      value={eventData.name}
      onChange={(e) => handleChange('name', e.target.value)}
      onBlur={() => setIsEditingName(false)}
      className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 pr-10 text-white"
      placeholder="Event name"
    />
  ) : (
    <div
      className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 pr-10 text-white cursor-pointer"
      onClick={() => setIsEditingName(true)}
    >
      {eventData.name || "Event name"}
    </div>
  )}
  <PenLine
    className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer opacity-70 hover:opacity-100"
    size={18}
    onClick={() => setIsEditingName(true)}
  />
</div>


        </div>

      <div className="relative">
  <label className="text-sm text-white/60">Description</label>
  <textarea
    value={eventData.description}
    onChange={(e) => {
      const words = e.target.value.split(/\s+/).filter(Boolean);
      if (words.length <= 200) {
        handleChange('description', e.target.value);
      }
    }}
    rows={3}
    className="w-full mt-1 bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white pr-20"
    placeholder="Enter description"
  />
  
  {/* Word count inside the textarea */}
  <div className="absolute bottom-3 right-4 text-xs text-white/40 pointer-events-none">
    {eventData.description.trim().split(/\s+/).filter(Boolean).length} / 200
  </div>
</div>



        <div className="w-full bg-[#2b2b2b] border border-white/20 rounded-xl overflow-hidden">
 <div className="relative">
  <img
    src={currentPoster}
    alt="Event Poster"
    className="w-full h-40 object-cover"
  />
  
  {/* Buttons */}
  <div className="absolute top-2 right-2 flex gap-2 z-10">
    <button
      onClick={switchTemplate}
      className="bg-white text-black px-2 py-1 text-xs rounded-md flex items-center gap-1"
    >
      <RefreshCcw size={14} />
    </button>
    <button className="bg-white text-black px-2 py-1 text-xs rounded-md flex items-center gap-1">
      <Image size={14} /> Add your Event Poster
    </button>
  </div>

  {/* Event Name Over Poster */}
  <div
    className={`absolute bottom-2 w-full px-4 z-10 text-white text-xl font-title`}
    style={{
      textAlign: textAlign,
      fontFamily // Apply dynamic alignment
    }}
  >
    {eventData.name || 'Event Name'}
  </div>
</div>


  <div className="p-1  flex gap-2">
    <div className="w-1/2">
      
      
      <div className='flex flex-col gap-1'>
         <button 
  className={`px-3 py-2 rounded-lg gap-2  flex items-center justify-between w-32 ${
    fontFamily !== 'Inter' ? 'bg-[#1e1e1e]' : 'bg-[#1e1e1e]'
  } hover:bg-[#4b4b4b] text-white`}
  onClick={() => {
    const fonts = [
      'Inter', 'Arial', 'Helvetica', 'Times New Roman', 'Roboto', 
      'Open Sans', 'Poppins', 'Lato', 'Georgia', 'Courier New'
    ];
    const currentIndex = fonts.indexOf(fontFamily);
    const nextIndex = (currentIndex + 1) % fonts.length;
    setFontFamily(fonts[nextIndex]);
  }}
>

  <p className='text-base font-semibold'>Ag</p>
  <p className='truncate text-sm max-w-[100px]'>{fontFamily}</p>
  <ChevronsUpDown size={20} />
</button>

            <p className='text-sm text-white p-2'>Align event name</p>
            <div className='flex gap-2'>
              <button 
                onClick={() => handleAlignChange('left')}
                className={`bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-2 flex py-2 rounded-lg gap-2 ${textAlign === 'left' ? 'bg-[#4b4b4b]' : ''}`}
              >
                <AlignLeft className='text-white' size={16} />
              </button>
              <button 
                onClick={() => handleAlignChange('center')}
                className={`bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-2 flex py-2 rounded-lg gap-2 ${textAlign === 'center' ? 'bg-[#4b4b4b]' : ''}`}
              >
                <AlignCenter className='text-white' size={16} />
              </button>
              <button 
                onClick={() => handleAlignChange('right')}
                className={`bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-2 flex py-2 rounded-lg gap-2 ${textAlign === 'right' ? 'bg-[#4b4b4b]' : ''}`}
              >
                <AlignRight className='text-white' size={16} />
              </button>
            </div>
          </div>
    </div>
<div className="w-44 flex flex-col items-center p-1 relative h-40 bg-[#4b4b4b] rounded-lg">
  {/* Container with explicit size matching the image */}
  <div
    className="relative w-[170px] mt-2 h-[100px] ml-2 cursor-pointer"
    onClick={switchTemplate}
    title="Click to change theme"
  >
    {/* Bottom-most shadow layer */}
    <div className="absolute w-[150px] h-full bg-[#2c2c2c] rounded-md top-2 left-2 z-0 shadow-md" />

    {/* Middle silver/glow layer */}
    <div className="absolute w-[150px] h-full bg-[#949494] rounded-md top-1 left-1 z-10 shadow-[0_0_8px_rgba(255,255,255,0.2)]" />

    {/* Top layer with the image */}
    <div className="relative z-20">
      <img
        src={currentPoster}
        className="rounded-md h-[100px] w-[150px] object-cover"
        alt="Preview"
      />
    </div>
  </div>

  {/* Text below the image with proper left and right padding */}
  <div className='flex gap-2 text-sm text-white absolute bottom-2 left-2 right-2'>
    <p>Try out more themes</p>
    <Sparkles size={16} />
  </div>
</div>



  </div>
</div>


   <div className="space-y-3">
  <div className="flex items-center justify-between">
    <p className="text-sm">Time and date</p>
    <PenLine
      size={16}
       title="Edit Date & Time"
      className="text-white/60 hover:text-white cursor-pointer"
      onClick={() => setShowPicker(true)}
    />
  </div>


  <div className="border border-white/20 rounded-lg  py-3 text-white text-sm bg-[#1e1e1e]">
    <div className="grid grid-cols-2 gap-4 relative p-3">
      {/* Start */}
     <div className="space-y-1">
  <p className="text-xs text-white/60">Start</p>

  {/* Date */}
  <p className="text-sm">
    {new Date(eventData.startDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}
  </p>

  {/* Weekday */}
  <span className="text-sm ">
    {new Date(eventData.startDate).toLocaleDateString('en-US', {
      weekday: 'long',
    })}
  </span>

  {/* Time */}
  <p className="text-lg ">
    {new Date(eventData.startDate).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}
  </p>
</div>


      {/* End */}
    <div className="space-y-1 text-right">
  <div className="flex justify-end items-center gap-1 text-xs text-white/60">
    <p>End</p>
    <CalendarDays size={14} />
  </div>

  {/* Date */}
  <p className="text-sm">
    {new Date(eventData.endDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}
  </p>

  {/* Weekday */}
  <p className="text-sm text-white/60">
    {new Date(eventData.endDate).toLocaleDateString('en-US', {
      weekday: 'long',
    })}
  </p>

  {/* Time */}
  <p className="text-lg ">
    {new Date(eventData.endDate).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}
  </p>
</div>


      {/* Vertical Divider */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
    </div>

<div className="w-full h-px bg-white/10 mt-2 mb-2" />
    {/* Timezone row */}
    <div className="flex items-center gap-2 mt-2 p-3 text-sm text-white/60">
      <Globe size={14} />
      <span>{eventData.timezone || 'GMT +05:30 Delhi'}</span>
    </div>
  </div>
</div>

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
  startDate={start}
  endDate={end}
  onChange={(dates) => {
    const [startDate, endDate] = dates;
    setStart(startDate);
    setEnd(endDate ?? startDate);
  }}
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
    className=''
  />
</div>
      </div>

      {/* Done Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
  const updatedStart = new Date(start);
  const updatedEnd = new Date(end);

  const [sh, sm] = timeRange.start.split(':');
  const [eh, em] = timeRange.end.split(':');

  updatedStart.setHours(+sh, +sm);
  updatedEnd.setHours(+eh, +em);

  handleChange('startDate', updatedStart.toISOString());
  handleChange('endDate', updatedEnd.toISOString());
  handleChange('timezone', timezone);

  setShowPicker(false);
}}

          className="text-sm text-black bg-white px-5 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Done
        </button>
      </div>
    </div>
  </div>
)}

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


        <div className="space-y-3 mt-6">
  <p className="text-sm font-semibold">Questions for Applicants</p>

{questions.map((field, index) => (
  <div
    key={field.id || index}
    className="bg-[#2b2b2b] border border-white/10 rounded-xl px-4 py-3 text-sm flex justify-between items-center relative"
  >
    {/* Number + Label */}
    <div className="flex items-center gap-2 flex-1">
      <span className="text-white text-sm">{index + 1}.</span>
      <input
        type="text"
        value={field.label}
        placeholder="Enter your question..."
        onChange={(e) => {
  const updated = [...questions];
  updated[index].label = e.target.value.trimStart();
  setQuestions(updated);
}}
onBlur={(e) => {
  const updated = [...questions];
  updated[index].label = e.target.value.trim();
  setQuestions(updated);
}}

        className="bg-transparent text-white flex-1 outline-none placeholder-white/40 text-sm"
      />
    </div>

    {/* Show type dropdown */}
    <div className="relative ml-3">
      <button
        onClick={() => {
          const updated = [...questions];
          updated[index].showDropdown = !updated[index].showDropdown;
          setQuestions(updated);
        }}
        className="flex items-center gap-1 px-2 py-1 text-xs text-white/70 hover:text-white rounded-md"
      >
        {field.type || (field.required ? 'Required' : 'Optional')}
        <ChevronsUpDown size={14} />
      </button>

      {field.showDropdown && (
        <div className="absolute right-0 mt-1 bg-[#1e1e1e] border border-white/10 rounded-md shadow-md z-10 w-32">
          {[' Name', 'Email', 'Phone', 'Required', 'Optional'].map((option) => (
            <div
              key={option}
              onClick={() => {
                const updated = [...questions];
                if (option === 'Required' || option === 'Optional') {
                  updated[index].required = option === 'Required';
                } else {
                  updated[index].type = option;
                }
                updated[index].showDropdown = false;
                setQuestions(updated);
              }}
              className="px-3 py-2 text-xs hover:bg-white/10 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
))}


  <div className="flex items-center gap-2 mt-2">
    <button
      onClick={addNewQuestion}
      className="text-xs bg-[#2b2b2b] px-4 py-2 rounded-lg flex items-center gap-2 border border-white/10"
    >
      <Plus size={14} /> Add New Question
    </button>

   <button
  onClick={addDOBQuestion}
  className="text-xs bg-[#2b2b2b] px-4 py-2 rounded-lg flex items-center gap-2 border border-white/10"
>
  <CalendarDays size={14} /> Ask For Date of Birth
</button>

  </div>
</div>


        <div className="flex gap-3 mt-6">
          <button className="w-full bg-white text-black font-semibold py-2 rounded-md">Update</button>
          <button className="w-full bg-white/10 text-white font-medium py-2 rounded-md">
            <Undo size={14} className="inline-block mr-1" /> Undo Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
