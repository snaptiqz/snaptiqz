import { createContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const queryClient = useQueryClient();

  // ✅ Fetch events by user
  const useMyEvents = (userId) =>
    useQuery({
      queryKey: ["myEvents", userId],
      queryFn: async () => {
        const res = await axios.get(`${backendUrl}/events`, {
          params: { createdBy: userId },
          withCredentials: true,
        });
        return res.data;
      },
      enabled: !!userId, // only fetch if userId exists
      staleTime: 1000 * 60 * 5, // 5 minutes
      onError: () => toast.error("Failed to fetch your events"),
    });

  // ✅ Fetch single event by ID
  const useEventById = (eventId, organizationId = null) =>
    useQuery({
      queryKey: ["event", eventId, organizationId],
      queryFn: async () => {
        const res = await axios.get(`${backendUrl}/events/${eventId}`, {
          params: organizationId ? { organizationId } : {},
          withCredentials: true,
        });
        return res.data;
      },
      enabled: !!eventId,
      staleTime: 1000 * 60 * 5,
      onError: () => toast.error("Failed to fetch event"),
    });

  return (
    <EventContext.Provider value={{ useMyEvents, useEventById }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
