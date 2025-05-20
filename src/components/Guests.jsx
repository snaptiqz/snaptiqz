import { useState, useRef, useEffect } from 'react';
import { UserPlus, Search, Lock, Users, Filter, UserCheck, ListFilter,Ellipsis,Frown,Check,Mailbox,Antenna,Tickets,LogIn,UserMinus2, UserX2 } from 'lucide-react';
import ScanGuest from './ScanGuest';
import { nav } from 'framer-motion/client';
import { useNavigate } from 'react-router-dom';

const Guests = ({ event }) => {

const [showEllipsisDropdown, setShowEllipsisDropdown] = useState(false);
const [showFilterDropdown, setShowFilterDropdown] = useState(false);
const [showPrivateFilterDropdown, setShowPrivateFilterDropdown] = useState(false);
const navigate = useNavigate();
const ellipsisRef = useRef();
const filterRef = useRef();
const privateFilterRef = useRef();


useEffect(() => {
  const handler = (e) => {
    if (
      ellipsisRef.current && !ellipsisRef.current.contains(e.target)
    ) setShowEllipsisDropdown(false);

    if (
      filterRef.current && !filterRef.current.contains(e.target)
    ) setShowFilterDropdown(false);

    if (
      privateFilterRef.current && !privateFilterRef.current.contains(e.target)
    ) setShowPrivateFilterDropdown(false);
  };

  document.addEventListener('mousedown', handler);
  return () => document.removeEventListener('mousedown', handler);
}, []);



  return (
    <div className="w-full max-w-xl mx-auto text-white p-1 space-y-6 mb-20">

      {/* Header Controls */}
      <div className="flex justify-start gap-2">
        <button className="bg-[#1e1e1e]  px-3 py-3 rounded-md flex flex-col items-start leading-tight">
  <div className="flex items-center gap-1 text-md">
    Registration <Tickets size={18} />
  </div>
  <span className="text-xs text-white/60">Group</span>
</button>

        <button className="bg-[#1e1e1e]  px-4 py-3 rounded-md flex flex-col items-start leading-tight">
          <div className="flex items-center gap-1 text-md ">
          Capacity<LogIn size={18} /> 
          </div>
           <span className="text-xs text-white/60">Unlimited</span>
        </button>
        

      </div>
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
         
          <h2 className="text-xl font-semibold">Guests (0)</h2>
        </div>
        <div className="flex justify-end gap-2">
          <button className="flex items-center gap-1 px-2 py-1.5 text-sm bg-[#2b2b2b] rounded-md" onClick={() => navigate('/scan-guest')}>
            <UserPlus size={14} /> Add Guests
          </button>
          <div className="relative" ref={ellipsisRef}>
  <button
    onClick={() => setShowEllipsisDropdown(!showEllipsisDropdown)}
    className="flex items-center text-sm p-2 py-1.5 bg-[#2b2b2b] rounded-md"
  >
    <Ellipsis size={16} />
  </button>
  {showEllipsisDropdown && (
    <div className="absolute right-0 mt-2 w-40 bg-[#2b2b2b] border border-white/10 rounded-md shadow z-50">
      <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-white/10 text-white text-sm">
        <UserMinus2 size={16} /> Remove Guest
      </button>
      <div className="border-t border-white/10" />
      <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-white/10 text-white text-sm">
        <UserX2 size={16} /> Block Guest
      </button>
    </div>
  )}
</div>
         <div className="relative" ref={filterRef}>
  <button
    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
    className="flex items-center px-2 py-1.5 text-sm bg-[#2b2b2b] rounded-md"
  >
    <ListFilter size={16} />
  </button>
  {showFilterDropdown && (
    <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-md shadow z-50">
      <button className="w-full px-4 py-2 text-sm text-white hover:bg-white/10 rounded-t-md">
        Names Alphabetic
      </button>
      <button className="w-full px-4 py-2 text-sm bg-[#333333] text-white hover:bg-white/10">
        Volunteers First
      </button>
      <button className="w-full px-4 py-2 text-sm text-white hover:bg-white/10 rounded-b-md">
        Latest Registration
      </button>
    </div>
  )}
</div>
        </div>
      </div>

      {/* Search Guest */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
        <input
          type="text"
          placeholder="Search For Guest"
          className="w-full pl-10 bg-[#1e1e1e] border border-[#848484] text-white text-sm py-2 px-4 rounded-lg outline-none placeholder:text-white/40"
        />
      </div>

      {/* Empty Guest Box */}
      <div className="bg-[#1e1e1e] border border-[#848484] rounded-lg px-4 py-4 text-center text-gray-300">
       <Frown size={20} className="mx-auto mb-2" />
        <p className="font-medium text-sm">No Guests yet</p>
        <p className="text-sm mt-1">
          Quick Add Guests by scanning their QR Code or entering invite code.{' '}
          <span className="text-white underline cursor-pointer">Share event</span> to spread the word!
        </p>
      </div>

      {/* Private Invite */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold">Private Invite</p>
          <div className="flex items-center gap-2">
            <button className="bg-[#2b2b2b] text-white text-center flex gap-1 text-sm px-2 py-1 rounded-md">
             <Check size={18} />
            Accepted</button>
           <div className="relative" ref={privateFilterRef}>
  <button
    onClick={() => setShowPrivateFilterDropdown(!showPrivateFilterDropdown)}
    className="flex items-center px-2 py-1.5 text-sm bg-[#2b2b2b] rounded-md"
  >
    <ListFilter size={16} />
  </button>
  {showPrivateFilterDropdown && (
    <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-md shadow z-50">
      <button className="w-full px-4 py-2 text-sm text-white hover:bg-white/10 rounded-t-md">
        Names Alphabetic
      </button>
      <button className="w-full px-4 py-2 text-sm bg-[#333333] text-white hover:bg-white/10">
        Volunteers First
      </button>
      <button className="w-full px-4 py-2 text-sm text-white hover:bg-white/10 rounded-b-md">
        Latest Registration
      </button>
    </div>
  )}
</div>
          </div>
        </div>

        {/* Search Delegates */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
          <input
            type="text"
            placeholder="Search For Delegates"
            className="w-full pl-10 bg-[#1e1e1e] border border-[#848484] text-white text-sm py-2 px-4 rounded-lg outline-none placeholder:text-white/40"
          />
        </div>

        {/* Empty Private Invite */}
        <div className="bg-[#1e1e1e] border border-[#848484] rounded-lg px-4 py-6 text-center text-gray-300">
          <Mailbox size={20} className="mx-auto mb-2" />
          <p className="font-medium text-sm">No Invites sent yet</p>
          <p className="text-xs mt-1">
            Send Private invites to guests — it will show up in their notifications.
          </p>
        </div>
      </div>

      {/* Entry Requests */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold">Entry Requests</p>
          <div className="flex gap-2">
            <button className="bg-[#2b2b2b] text-sm px-3 py-2 rounded-md">Accept all</button>
            <button className="bg-[#2b2b2b] text-sm px-3 py-2 rounded-md">Reject all</button>
          </div>
        </div>

        <div className="bg-[#1e1e1e] border border-[#848484] rounded-lg px-4 py-4 text-center text-gray-300">
          <Antenna size={20} className="mx-auto mb-2" />
          <p className="font-medium text-sm">No Requests Yet</p>
          <p className="text-xs mt-1">
            When guests start registering, the requests will show up here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guests;
