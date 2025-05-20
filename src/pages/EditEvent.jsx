import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import TopNavbar from '../components/TopNavbar';
import StarryBackground from '../components/StarryBackground';
import {
  Upload, Pencil, MapPin, Link2, Plus, Undo
} from 'lucide-react';
import Spinner from '../components/Spinner';

const EditEvent = () => {
  const { id: eventId } = useParams();
  const { fetchEventById } = useContext(EventContext);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      const data = await fetchEventById(eventId);
      setEventData(data);
    };
    loadEvent();
  }, [eventId]);

  if (!eventData) return <Spinner />;

  const handleChange = (field, value) => {
    setEventData({ ...eventData, [field]: value });
  };

  return (
    <div className="min-h-screen w-full text-white bg-[#010205] relative overflow-hidden pb-20"
         style={{ backgroundImage: `radial-gradient(circle at top, rgba(0, 70, 255, 0.1) 0%, transparent 20%)` }}>
      <TopNavbar />
      <StarryBackground count={60} />

      <div className="max-w-xl mx-auto px-4 mt-24 space-y-6">
        <div>
         
          <div className="relative mt-1">
            <input
              value={eventData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 pr-10 text-white"
              placeholder="Event name"
            />
            <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
          </div>
        </div>

        <div>
          <label className="text-sm text-white/60">Description</label>
          <textarea
            value={eventData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="w-full mt-1 bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white"
            placeholder="Enter description"
          />
        </div>

        <div className="w-full bg-[#1e1e1e] border border-white/20 rounded-xl overflow-hidden">
          <div className="relative">
            <img src={eventData.image || '/placeholder.jpg'} alt="Event Poster" className="w-full h-40 object-cover" />
            <button className="absolute top-2 right-2 bg-black/60 px-2 py-1 text-xs rounded-md flex items-center gap-1">
              <Upload size={14} /> Add your Event Poster
            </button>
          </div>
          <div className="p-4">
            <p className="text-lg font-title mb-1">{eventData.name || 'Event Name'}</p>
            <p className="text-sm text-white/40">Try out more themes</p>
            <div className="flex gap-2 mt-3">
              <button className="w-1/3 py-2 rounded-md bg-white/10">Left</button>
              <button className="w-1/3 py-2 rounded-md bg-white/10">Center</button>
              <button className="w-1/3 py-2 rounded-md bg-white/10">Right</button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Time and date</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1e1e1e] border border-white/20 rounded-lg p-3">
              <p className="text-xs text-white/50 mb-1">Start</p>
              <p className="text-sm">{new Date(eventData.startDate).toLocaleDateString()}</p>
              <p className="text-xs">{new Date(eventData.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="bg-[#1e1e1e] border border-white/20 rounded-lg p-3">
              <p className="text-xs text-white/50 mb-1">End</p>
              <p className="text-sm">{new Date(eventData.endDate).toLocaleDateString()}</p>
              <p className="text-xs">{new Date(eventData.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
          <p className="text-xs text-white/50 mt-1">{eventData.timezone}</p>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="w-1/2 bg-[#2b2b2b] flex items-center justify-center gap-1 py-2 rounded-md text-sm">
            <MapPin size={16} /> {eventData.location ? eventData.location : 'Add Event Location'}
          </button>
          <button className="w-1/2 bg-[#1a1a1a] flex items-center justify-center gap-1 py-2 rounded-md text-sm opacity-50">
            <Link2 size={16} /> {eventData.virtualLink ? 'Virtual Link' : 'Add Virtual Link'}
          </button>
        </div>

        <div className="space-y-3 mt-6">
          <p className="text-sm font-semibold">Questions for Applicants</p>
          {eventData.formFields?.map((field, index) => (
            <div key={field.id || index} className="bg-[#1e1e1e] border border-white/20 rounded-lg px-4 py-3 text-sm flex justify-between items-center">
              <span>{index + 1}. {field.label}</span>
              <span className="text-white/50 text-xs">{field.required ? 'Required' : 'Optional'}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2">
            <button className="text-xs bg-white/10 px-3 py-2 rounded-md flex items-center gap-1">
              <Plus size={14} /> Add New Question
            </button>
            <button className="text-xs bg-white/10 px-3 py-2 rounded-md">
              Ask For Date of Birth
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
