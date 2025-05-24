import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, PenLine, Undo
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { EventContext } from '../context/EventContext';
import TopNavbar from '../components/TopNavbar';
import StarryBackground from '../components/StarryBackground';
import Spinner from '../components/Spinner';
import FormQuestions from '../components/FormQuestions';
import DateTimePicker from '../components/DateTimePicker';
import LocationSection from '../components/LocationSection';
import EditPosterUploader from '../components/EditPosterUploader';
import ticket1 from '../assets/ticketdesign1.png';
import ticket2 from '../assets/ticketdesign2.png';
import timezoneList from '../data/timezones.json';

const EditEvent = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { useEventById,queryClient } = useContext(EventContext);
  const { data: eventData, isLoading } = useEventById(eventId);

  const templates = useMemo(() => [ticket1, ticket2], []);
  const mapFieldType = useMemo(() => ({
    Name: 'short_text',
    'Short Text': 'short_text',
    'Long Text': 'long_text',
    Email: 'email',
    Phone: 'phone',
    Date: 'date',
    Dropdown: 'dropdown',
    Radio: 'radio',
    Text: 'short_text',
  }), []);

  const [formData, setFormData] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [posterTemplateIndex, setPosterTemplateIndex] = useState(0);
  const [posterFile, setPosterFile] = useState();
  const [fontFamily, setFontFamily] = useState('Inter');
  const [textAlign, setTextAlign] = useState('right');
  const [showPicker, setShowPicker] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [timeRange, setTimeRange] = useState({ start: '', end: '' });
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [isVirtual, setIsVirtual] = useState(false);
  const [virtualLink, setVirtualLink] = useState('');
  const [location, setLocation] = useState('');
  const [questions, setQuestions] = useState([]);
  const [coverImage, setCoverImage] = useState(null);

  const currentPoster = templates[posterTemplateIndex];

  const switchTemplate = () => setPosterTemplateIndex((prev) => (prev + 1) % templates.length);
  const handleAlignChange = (align) => setTextAlign(align);
  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    if (!eventData) return;
    setFormData(eventData);
    setStart(new Date(eventData.startDate));
    setEnd(new Date(eventData.endDate));
    setTimeRange({
      start: new Date(eventData.startDate).toTimeString().slice(0, 5),
      end: new Date(eventData.endDate).toTimeString().slice(0, 5),
    });
    setTimezone(eventData.timezone || 'Asia/Kolkata');
    setQuestions(eventData.formFields || []);
    setIsVirtual(!!eventData.virtualLink);
    setVirtualLink(eventData.virtualLink || '');
    setLocation(eventData.location || '');
  }, [eventData]);

  const sanitizeValidations = (obj = {}) =>
    Object.fromEntries(
      Object.entries(obj).filter(([_, val]) =>
        val !== undefined && typeof val !== 'function' && typeof val !== 'symbol'
      )
    );

  const handleSubmit = async () => {
    try {
      const combinedStart = new Date(start);
      const combinedEnd = new Date(end);

      const formFields = questions.map((q, i) => ({
        id: q.id || `field-${i}`,
        label: q.label || '',
        type: mapFieldType[q.type] || 'short_text',
        required: !!q.required,
        options: Array.isArray(q.options) ? q.options.filter(opt => opt?.trim()) : [],
        placeholder: q.placeholder || '',
        order: Number.isInteger(q.order) ? q.order : i + 1,
        defaultValue: q.defaultValue || '',
        description: q.description || '',
        validations: sanitizeValidations(q.validations),
      }));

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name || '');
      formDataToSend.append("description", formData.description || '');
      formDataToSend.append("status", formData.status || 'DRAFT');
   if (coverImage instanceof File) {
  formDataToSend.append("coverImage", coverImage);
}



      formDataToSend.append("isRegistrationOpen", true);
      formDataToSend.append("showGuestList", true);
      formDataToSend.append("organizationId", formData.organizationId || '');
      formDataToSend.append("eventType", isVirtual ? 'online' : 'offline');
      formDataToSend.append("virtualLink", isVirtual ? virtualLink : '');
      formDataToSend.append("location", isVirtual ? '' : location || '');
      formDataToSend.append("timezone", timezone || '');
      formDataToSend.append("startDate", combinedStart.toISOString());
      formDataToSend.append("endDate", combinedEnd.toISOString());
      formDataToSend.append("maxAttendees", formData.maxAttendees || 1);
      formDataToSend.append("tags", JSON.stringify(formData.tags || []));
      formDataToSend.append("createdBy", formData.createdBy?.id || formData.createdBy || '');
      formDataToSend.append("formFields", JSON.stringify(formFields));

      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/events/${eventId}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
    

      toast.success('Event updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
      toast.error('Failed to update event.');
    }
  };

  if (!formData || isLoading) return <Spinner />;

  return (
    <div className="min-h-screen w-full text-white bg-[#010205] relative overflow-hidden pt-16 pb-24">
      <TopNavbar />
      <StarryBackground count={60} />
      <div className="max-w-xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="text-white bg-[#2b2b2b] p-1 rounded-lg" size={28} />
          </button>
          <h2 className="text-xl">Edit Event</h2>
        </div>

        {/* Name input */}
        <div className="relative group">
          {isEditingName ? (
            <input
              autoFocus
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => setIsEditingName(false)}
              className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 pr-10 text-white"
              placeholder="Event name"
            />
          ) : (
            <div
              onClick={() => setIsEditingName(true)}
              className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 pr-10 text-white cursor-pointer"
            >
              {formData.name || 'Event name'}
            </div>
          )}
          <PenLine
            onClick={() => setIsEditingName(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer opacity-70 hover:opacity-100"
            size={18}
          />
        </div>

        {/* Description */}
        <div className="relative">
          <label className="text-sm text-white/60">Description</label>
          <textarea
            value={formData.description}
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
          <div className="absolute bottom-3 right-4 text-xs text-white/40 pointer-events-none">
            {formData.description?.trim().split(/\s+/).filter(Boolean).length || 0} / 200
          </div>
        </div>

        {/* Poster */}
       <EditPosterUploader
        coverImage={coverImage}
        setCoverImage={setCoverImage}
        currentPoster={currentPoster}
        imageUrl={formData.coverImage}
        switchTemplate={switchTemplate}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        textAlign={textAlign}
        handleAlignChange={handleAlignChange}
        eventName={formData.name}
      />
        {/* Time + Location + Questions */}
        <DateTimePicker
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          timezone={timezone}
          setTimezone={setTimezone}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          timezoneList={timezoneList}
        />

        <LocationSection
          isVirtual={isVirtual}
          setIsVirtual={setIsVirtual}
          virtualLink={virtualLink}
          setVirtualLink={setVirtualLink}
          location={location}
          setLocation={setLocation}
        />

        <FormQuestions questions={questions} setQuestions={setQuestions} />

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-white text-black font-semibold py-2 rounded-md"
          >
            Update
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-white/10 text-white font-medium py-2 rounded-md"
          >
            <Undo size={14} className="inline-block mr-1" /> Undo Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
