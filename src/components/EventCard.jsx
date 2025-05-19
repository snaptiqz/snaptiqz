import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Eye,
  Copy,
  Settings2,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust path as needed

const EventCard = ({ event }) => {
  const { user } = useContext(AuthContext);
  const authUserId = user?._id;

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
  } = event;

  const isPrivate = !isPublic;
  const isPaid = tickets.some(ticket => ticket.isPaid);
  const isOwner = authUserId === createdBy;

  const formattedDate = startDate ? new Date(startDate).toLocaleDateString() : "TBD";
  const startTime = startDate ? new Date(startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "TBD";
  const endTime = endDate ? new Date(endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "TBD";

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold">{name || "Untitled Event"}</h3>
        <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-full">
          {isPublic ? "Public Event" : "Private Event"}
        </span>
      </div>

      <div className="space-y-1 text-sm text-white/80">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{startTime} to {endTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{eventType === "online" ? virtualLink || "Online" : location || "Venue TBD"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={16} />
          <span>{isPaid ? "Paid Ticketed Event" : "Free Entry"}</span>
        </div>
      </div>

      <div className="flex gap-4 mt-3">
        <img
          src={image || "/default-poster.jpg"}
          alt="Event Poster"
          className="w-20 h-14 object-cover rounded-md border border-white/10"
        />
        <p className="text-xs text-white/60 line-clamp-3">{description || "No description provided."}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 text-xs">
        {isOwner ? (
          <>
            {(status === "DRAFT" || status === "PUBLISHED") && (
              <button className="btn-action">
                <Settings2 size={14} /> Manage Event
              </button>
            )}
            {isPrivate && (
              <button className="btn-action">
                <Users size={14} /> Private Invites
              </button>
            )}
            <button className="btn-action">
              <Copy size={14} /> Clone
            </button>
          </>
        ) : (
          <button className="btn-action">
            <Eye size={14} /> View
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
