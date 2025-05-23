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
import defaultPoster from "../assets/default_poster.png";

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
    coverImage,
    isPublic,
    tickets = [],
    createdBy,
    isPaid,
    guests = [],
    tags = [],
  } = event;

  const isPrivate = !isPublic;
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
  <div className="bg-[#1e1e1e]/70 backdrop-blur-lg border border-white/10 p-4 rounded-lg mb-4 text-white">


      {/* Header: Title + Privacy */}
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-lg line-clamp-1">{name || "Untitled Event"}</p>
        <div className="flex items-center gap-1 text-sm text-white bg-[#2e2e2e] px-2 py-1 rounded-md">
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
        <div className="flex flex-col gap-2 text-sm text-white flex-1">
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
        
        </div>

        <div className="w-24 h-24 rounded overflow-hidden border border-white/10 shrink-0">
        <img
          src={coverImage || defaultPoster}
          alt="Event Poster"
          className="object-cover w-full h-full"
        />
      </div>

      </div>

      {/* Guests */}
      
     
      <p className="text-xs text-white line-clamp-2 mt-1">
    {description || "No description provided."}
  </p>

     

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-white">
          {tags.map((tag, idx) => (
            <span key={idx} className="  rounded-full flex items-center gap-1">
              <Tag size={16} />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCard;
