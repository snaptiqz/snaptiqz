import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [eventList, setEventList] = useState([]);
const [hasFetched, setHasFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all events created by user
  const fetchMyEvents = async (userId) => {
  if (hasFetched) return; // ✅ skip if already fetched
  setLoading(true);
  try {
    const res = await axios.get(`${backendUrl}/events`, {
      params: { createdBy: userId },
      withCredentials: true,
    });
    setEventList(res.data);
    console.log("Fetched events:", res.data);
    setHasFetched(true); // ✅ prevent future fetches
  } catch (err) {
    toast.error("Failed to fetch events");
  } finally {
    setLoading(false);
  }
};

const fetchEventById = async (eventId, organizationId = null) => {
  setLoading(true);
  try {
    const res = await axios.get(`${backendUrl}/events/${eventId}`, {
      params: organizationId ? { organizationId } : {},
      withCredentials: true,
    });
    console.log("Fetched event by ID:", res.data);
    return res.data;
  } catch (err) {
    toast.error("Failed to fetch event");
    return null;
  } finally {
    setLoading(false);
  }
};


  return (
    <EventContext.Provider value={{ eventList, loading, fetchMyEvents,fetchEventById }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
