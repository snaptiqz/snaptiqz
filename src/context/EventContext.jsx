import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const EventContext = createContext();

const EventContextProvider = ({ children }) => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    status: "DRAFT",
    maxAttendees: 1,
    startDate: null,
    endDate: null,
    timezone: "",
    eventType: "",
    eventUrl: "",
    location: "",
    image: "", // can be URL or a file path string
    isRegistrationOpen: true,
    hosts: "",
    showGuestList: true,
    formFields: [],
    tags: [""],
    isPublic: true,
    organizationId: "",
    tickets: [],
    teamMembers: []
  });

  const handleChange = (field, value) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTicketChange = (index, field, value) => {
    setEventData((prev) => {
      const updatedTickets = [...prev.tickets];
      updatedTickets[index][field] = value;
      return { ...prev, tickets: updatedTickets };
    });
  };

  const createEvent = async () => {
    try {
      const payload = { ...eventData };
      console.log("Payload to send:", payload);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/events/create`,
        payload
      );

      toast.success("Event created successfully!");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to create event.");
    }
  };

  return (
    <EventContext.Provider
      value={{
        eventData,
        setEventData,
        handleChange,
        handleTicketChange,
        createEvent
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
