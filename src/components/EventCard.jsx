import React, { useContext } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Eye,
  Copy,
  Settings2,
  Globe,
  Lock,
  Tag,
  UsersRound,
  CalendarDays,DollarSign,
  Earth
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import defaultPoster from "../assets/default_poster.svg";

const EventCard = ({ event }) => {
  const { user } = useContext(AuthContext);
  const authUserId = user?.id;

  const {
    name,
    description,
    status,
    startDate,
    endDate,
    eventType,
    location,
    virtualLink,
    image,
    isPublic,
    tickets = [],
    createdBy,
    guests = [],
    tags = [],
  } = event;

  const isPrivate = !isPublic;
  const isPaid = tickets.some(ticket => ticket.isPaid);
  const isOwner = authUserId === createdBy;

  const formattedDate = startDate
    ? new Date(startDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "TBD";

  const startTime = startDate
    ? new Date(startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "TBD";

  const endTime = endDate
    ? new Date(endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "TBD";

  return (
    <div className="bg-[#1e1e1e] p-2 rounded-lg mb-4 text-white">
      {/* Header: Title + Privacy */}
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-2xl line-clamp-1">{name || "Untitled Event"}</p>
        <div className="flex items-center gap-2 text-sm text-white bg-[#2e2e2e] px-2 py-1 rounded-md">
          {isPublic ? (
            <>
              <Earth size={14} /> Public Event
            </>
          ) : (
            <>
              <Lock size={14} /> Private Event
            </>
          )}
        </div>
      </div>

      {/* Body: Details + Image side-by-side */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1 text-xs text-white flex-1">
           <div className="flex items-center gap-2">
            <CalendarDays size={14} />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{startTime} to {endTime}</span>
          </div>
         
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{eventType === "online" ? (virtualLink || "Online") : (location || "To be announced")}</span>
          </div>
           <div className="flex items-center gap-2">
            <DollarSign size={14} />
            <span>{isPaid ? "Paid" : "Free"}</span>
          </div>
        </div>

        <div className="w-32 h-20 rounded overflow-hidden border border-white/10 shrink-0">
          <img
            src={image || defaultPoster}
            alt="Event Poster"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Guests */}
      
      {guests.length > 0 ? (
  <div className="flex items-center gap-2 text-xs text-white">
    <UsersRound size={14} className="shrink-0" />
    <p className="font-medium">Special Guests:</p>
    <p className="line-clamp-1 truncate">{guests.join(", ")}</p>
  </div>
) : (
  <p className="text-xs text-white line-clamp-2 mt-2">
    {description || "No description provided."}
  </p>
)}


     

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-white">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-[#1A1A1A] rounded-full flex items-center gap-1">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCard;
