import React, { useEffect, useState,useRef } from 'react';
import ticket from '../assets/ticket.svg';
import gridBg from '../assets/Grid_mob.svg';
import { ChevronDown, ChevronRight, Circle, Mail, CirclePlus, Plus, SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import StarryBackground from '../components/StarryBackground';
import EventCard from '../components/EventCard';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { EventContext } from '../context/EventContext';
import { Eye, Copy, Settings2, Users } from 'lucide-react';
import Spinner from '../components/Spinner';
import { motion } from 'framer-motion';


const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { eventList, loading, fetchMyEvents } = useContext(EventContext);
  const [activeFilter, setActiveFilter] = useState('UPCOMING');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const scrollRef = useRef(null);

   
  useEffect(() => {
    if (user?.id) {
      fetchMyEvents(user.id);
    }
  }, [user]);

  // Filter events based on active filter and search term
  useEffect(() => {
    if (!eventList.length) {
      setFilteredEvents([]);
      return;
    }

    const currentDate = new Date();
    
    let filtered = eventList.filter(event => {
      const eventStartDate = new Date(event.startDate);
      const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            event.description?.toLowerCase().includes(searchTerm.toLowerCase());

      if (activeFilter === 'DRAFT') {
        return event.status === 'DRAFT' && matchesSearch;
      } else if (activeFilter === 'UPCOMING') {
        return event.status !== 'DRAFT' && eventStartDate > currentDate && matchesSearch;
      } else if (activeFilter === 'PAST') {
        return event.status !== 'DRAFT' && eventStartDate <= currentDate && matchesSearch;
      }
      return matchesSearch;
    });

    setFilteredEvents(filtered);
  }, [eventList, activeFilter, searchTerm]);

  return (
    <div
      className="min-h-screen w-full text-white bg-[#010205] pt-16 relative overflow-hidden "
      style={{
        backgroundImage: `radial-gradient(circle at top, rgba(0, 70, 255, 0.1) 0%, transparent 20%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <TopNavbar scrollRef={scrollRef}  />

      <img
        src={gridBg}
        alt="grid background"
        className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-3/4 w-[120vw] sm:w-[60vw] max-w-none opacity-80 pointer-events-none z-0"
      />

      
      <StarryBackground count={80} />

      <div

  className="relative z-20 w-full flex flex-col px-6 mb-20  ref={scrollRef}"
>

        {loading ? (
         <Spinner/>
        ) : eventList.length === 0 ? (
          <>
            <h1 className="text-2xl text-left w-full font-semibold mb-10">Events</h1>
            <div className="flex flex-col items-center justify-center text-center w-full">
              <div className="relative w-22 h-22 mb-4">
                <img src={ticket} alt="ticket" className="w-full h-full" />
                <div className="absolute bottom-3 right-0 bg-[#626262] text-black text-xs font-semibold rounded-md px-2 py-[2px] shadow-sm">
                  0
                </div>
              </div>

              <p className="text-gray-300 mb-1">You haven't hosted any events yet</p>
              <p className="text-sm text-gray-500 mb-6">Let's create your first</p>

              <div className="flex justify-center w-full">
                <button
                  onClick={() => navigate('/create_event')}
                  className="px-6 py-2 rounded-full bg-white/10 border border-white text-white text-sm hover:bg-white/20 transition flex items-center gap-2"
                >
                  <Plus className="text-white text-sm" />
                  Create Event
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
          
            {/* Top Controls Bar */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              {/* Left: Events Title + Create */}
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">Events</h1>
                <button
                  onClick={() => navigate('/create_event')}
                  className="text-white hover:bg-white/10"
                >
                  <CirclePlus size={24} strokeWidth={2.5} />
                </button>
              </div>

              {/* Right: Filter Buttons */}
              <div className="flex bg-[#1a1a1a] rounded-md overflow-hidden text-xs text-white">
                <button 
                  className={`px-2 py-2 transition ${activeFilter === 'DRAFT' ? 'bg-white/10 font-medium' : 'hover:bg-white/10'}`}
                  onClick={() => setActiveFilter('DRAFT')}
                >
                  Draft
                </button>
                <button 
                  className={`px-2 py-2 transition ${activeFilter === 'UPCOMING' ? 'bg-white/10 font-medium' : 'hover:bg-white/10'}`}
                  onClick={() => setActiveFilter('UPCOMING')}
                >
                  Upcoming
                </button>
                <button 
                  className={`px-2 py-2 transition ${activeFilter === 'PAST' ? 'bg-white/10 font-medium' : 'hover:bg-white/10'}`}
                  onClick={() => setActiveFilter('PAST')}
                >
                  Past
                </button>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search For Events"
                className="w-full bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-white/40 rounded-md px-4 py-2 pl-10 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
            </div>

            {filteredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <p className="text-gray-300 mb-1">No {activeFilter.toLowerCase()} events found</p>
                {searchTerm && <p className="text-sm text-gray-500">Try adjusting your search</p>}
              </div>
            ) : (
              /* Timeline running directly beneath cards and date display */
            <div className="relative min-h-screen overflow-y-auto scrollbar-hidden   ">
                {/* Infinite vertical timeline line */}
               <div className="absolute left-4 top-10 bottom-0 w-px bg-white z-0"></div>


                <div className="flex flex-col gap-6 relative z-10">
                  {Object.entries(
                    filteredEvents.reduce((acc, event) => {
                      const date = new Date(event.startDate).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      });
                      acc[date] = acc[date] || [];
                      acc[date].push(event);
                      return acc;
                    }, {})
                  ).map(([date, events], dateIndex) => (
                    <div key={dateIndex} className="relative">
                      {/* Date label */}
                      

                      {/* Event Cards */}
                      <div className="flex flex-col gap-4 ">
                        {events.map((event) => (
                          
                          <div key={event.id} className="relative">
                           <motion.div
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.3, ease: 'easeOut', delay: 0.5 }}
  className="absolute top-4 left-4 w-[28px] h-[32px] border-t-[3px] border-l-[1px] border-white rounded-tl-full"
/>

{/* 3. Date appears after curve */}
<motion.div
  initial={{ opacity: 0, x: -10 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.3, ease: 'easeOut', delay: 0.8 }}
  className="relative flex items-center ml-14 mb-4 mt-1"
>
  <div className="text-lg font-semibold">{date}</div>
</motion.div>
                           <div className="relative z-10">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: 'easeOut', delay: 0 }}
  >
    <EventCard event={event} className="z-20" />
  </motion.div>

                              <div className="absolute left-4 w-2 h-2 bg-white/70 rounded-full -translate-x-1 top-full z-10"></div>

                              <div className="flex flex-row gap-2 justify-end -mt-2 mb-6">
                                {user.id === event.createdBy ? (
                                  <>
                                    {event.status === 'DRAFT' && (
                                      <button className="text-xs bg-[#1A1A1A] border border-gray-800 px-3 py-1.5 rounded">
                                        Continue editing <ChevronRight size={14} className="inline-block ml-1" />
                                      </button>
                                    )}
                                    {event.status !== 'DRAFT' && new Date(event.startDate) > new Date() && (
                                      <button className="text-xs bg-[#1A1A1A] border border-gray-800 px-3 py-1.5 rounded">
                                        Manage Event <ChevronRight size={14} className="inline-block ml-1" />
                                      </button>
                                    )}
                                    {!event.isPublic && (
                                      <button className="text-xs bg-[#1A1A1A] border border-gray-800 px-3 py-1.5 rounded">
                                        Private Invites <Mail size={14} className="inline-block ml-1" />
                                      </button>
                                    )}
                                    {event.status !== 'DRAFT' && new Date(event.startDate) <new Date() && (
                                    <button className="text-xs bg-[#1A1A1A] border border-gray-800 px-3 py-1.5 rounded">
                                      Clone event <ChevronRight size={14} className="inline-block ml-1" />
                                    </button>
                                    )}
                                  </>
                                ) : (
                                  <button className="text-xs bg-[#1A1A1A] border border-gray-800 px-3 py-1.5 rounded">
                                    <Eye size={14} className="inline-block mr-1" /> View
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;