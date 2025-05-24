import React,{useState} from 'react';
import { CalendarDays, Clock4, Users, Eye, Plus, Earth,Lock, UsersRound, HandHeart, UserRoundPlus, Search, Share, Share2, PenLine,Ellipsis } from 'lucide-react';
import defaultPoster from "../assets/default_poster.png";
import avatar from "../assets/avatar.svg";
import { useNavigate } from 'react-router-dom';

const Overview = ({ event }) => {
 

  const {
    name,
    description,
    coverImage,
    startDate,
    endDate,
    eventType,
    isPublic,
    hosts,
    location,
    virtualLink,
    tags,
    timezone,
   
  } = event;

  const navigate = useNavigate();
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
    const [guestStatuses, setGuestStatuses] = useState([true, true, false]);

  const formattedTime =
    start && end
      ? `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      : 'To be announced';

  const formattedDate =
    start
      ? start.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'To be announced';


    const guestStats = {
  going: 15,
  pending: 3,
  invited: 1,
  volunteering: 1,
};

const totalGuests =
  guestStats.going +
  guestStats.pending +
  guestStats.invited +
  guestStats.volunteering;

const percent = (count) =>
  totalGuests > 0 ? Math.round((count / totalGuests) * 100) : 0;

  const toggleGuestStatus = (index) => {
    setGuestStatuses((prev) =>
      prev.map((status, i) => (i === index ? !status : status))
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto text-white mb-20 ">

        <div className='flex justify-between gap-2 mb-2'>
           <button className='bg-[#1e1e1e] px-2 text-md py-2 rounded-md flex items-center gap-1'>
            Share <Share2 size={18} />
           </button>
           <div className='flex justify-end gap-2'>
            <button className='bg-[#1e1e1e] px-2 text-md py-2 rounded-md flex items-center gap-1'onClick={() => navigate(`/editTicket/${event.id}?orgId=${event.organizationId}`)} >
           
            Tickets <PenLine size={18} />
            </button>
            <button className='bg-[#1e1e1e] px-2 text-md py-2 rounded-md flex items-center gap-1' onClick={() => navigate(`/edit/${event.id}?orgId=${event.organizationId}`)}>
            Events <PenLine size={18} />
            </button>

           </div>

            
            

        </div>
      {/* Event Card */}
      <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl overflow-hidden shadow-md ">
        <img
          src={coverImage || defaultPoster}
          alt="Event Poster"
          className="w-full h-full object-cover p-2 rounded-2xl"
        />
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{name || 'Untitled Event'}</h2>
            <span className="text-sm bg-[#2e2e2e] px-2 py-1 rounded-md flex items-center gap-1">
                {isPublic ? (
                    <>
                    <Earth size={16} /> Public event
                    </>
                ) : (
                    <>
                    <Lock size={16} />
                    Private event
                    </>
                )}
                </span>

          </div>
          <p className="text-white/60 text-sm mt-1">By {hosts || 'Unknown'}</p>
          <p className="text-sm text-white/80 mt-2">
            {description || 'No description provided.'}
          </p>

          <div className="flex items-center gap-3 text-sm text-white/70 mt-4">
            <Clock4 size={16} /> {formattedTime}
            <Users size={16} /> {event.guests?.length || '0'} Guests
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70 mt-2">
            <CalendarDays size={16} /> {formattedDate}
          </div>
    
        
          
        </div>
          <div className="flex justify-end mb-4">
  <button className="py-1 px-3 bg-white mr-2 text-black rounded-lg font-medium">
    Register
  </button>
</div>

      </div>

      {/* Guests Summary */}
      <div className="mt-6">
  <h3 className="text-lg font-semibold mb-2">{totalGuests} Guests</h3>

  {/* Progress bar composed of multiple segments */}
  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden flex">
    <div
      className="h-full bg-green-500"
      style={{ width: `${percent(guestStats.going)}%` }}
    />
    <div
      className="h-full bg-orange-400"
      style={{ width: `${percent(guestStats.pending)}%` }}
    />
    <div
      className="h-full bg-blue-400"
      style={{ width: `${percent(guestStats.invited)}%` }}
    />
    <div
      className="h-full bg-yellow-300"
      style={{ width: `${percent(guestStats.volunteering)}%` }}
    />
  </div>

  <div className="text-xs text-white/60 mt-1 flex gap-4 flex-wrap">
    <span className="text-green-500">{guestStats.going} Going</span>
    <span className="text-orange-400">{guestStats.pending} Pending</span>
    <span className="text-blue-400">{guestStats.invited} Invite Sent</span>
    <span className="text-yellow-300">{guestStats.volunteering} Volunteering</span>
  </div>
</div>
      {/* Recent Guests */}
      <div className="mt-6">
        <div className='flex justify-start gap-2 mb-2'>
        <UsersRound className="text-white mb-2" size={24} />
        <h3 className="text-lg font-semibold mb-2">Recent Guests</h3>
        </div>
         {guestStatuses.map((isGoing, i) => (
        <div
          key={i}
            className="flex items-center justify-between bg-[#1e1e1e] px-4 py-3 rounded-lg mb-2"
          >
            <div className='flex items-center gap-4'>
               <img className='w-10 h-10' src={avatar}/> 
              <p className="text-sm font-medium">emailid@gmail.com</p>
              <p className="text-xs text-white/50">{i === 0 ? 'Just Now' : `${i}h Ago`}</p>
            </div>
             <button
            onClick={() => toggleGuestStatus(i)}
            className={`text-xs  py-1 rounded-full font-semibold transition ${
              isGoing
                ? 'bg-transparent text-green-500'
                : 'bg-red-500 text-white px-3 !rounded'
            }`}
          >
            {isGoing ? 'Is Going' : 'Let in'}
          </button>
          </div>
        ))}
      </div>

      {/* Volunteers */}
      <div className="mt-6">
       <div className="flex justify-between items-center mb-2">
  {/* Left: Icon + Title */}
  <div className="flex items-center gap-2">
    <HandHeart className="text-white" size={26} />
    <h3 className="text-lg font-semibold">Volunteers</h3>
  </div>

  {/* Right: Buttons aligned to end */}
  <div className="flex items-center gap-2 ml-auto">
    <button className="text-sm flex items-center gap-1 bg-[#2b2b2b] px-3 py-2 rounded-lg">
      <UserRoundPlus size={14} /> Add Volunteers
    </button>
    <div className="text-sm bg-[#2b2b2b] px-3 py-2 rounded-lg">
      <Ellipsis size={16} />
    </div>
  </div>
</div>

       <div className="relative w-full">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
  <input
    type="text"
    placeholder="Search For Delegates"
    className="w-full bg-[#1e1e1e] text-white px-4 py-2 pl-10 rounded-lg text-sm outline-none placeholder-white/50"
  />
</div>
        <div className="mt-4 flex flex-col items-center justify-center py-10 text-white/50 bg-[#1e1e1e] rounded-xl">
          <HandHeart size={24} />
          <p className="mt-2 text-sm text-center px-4">
            No Volunteers yet<br />
            When adding volunteers an invite will be sent separately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
