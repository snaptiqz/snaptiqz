import React, { useState } from 'react';
import { Search, UserRound, X } from 'lucide-react';
import avatar from '../assets/avatar.svg';

const WaitingList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const waitingList = [
    { email: 'emailid@gmail.com', time: '3h Ago' },
    { email: 'emailid@gmail.com', time: '3h Ago' },
    { email: 'emailid@gmail.com', time: '3h Ago' },
  ];

  const filteredGuests = waitingList.filter((guest) =>
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-xl mx-auto text-white space-y-4 mb-20">
      {/* Header */}
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-lg font-semibold">Waiting list ({waitingList.length})</h2>
        <div className="flex gap-2">
          <button className="bg-white text-black text-sm px-3 py-1.5 rounded-md">
            Accept all
          </button>
          <button className="bg-white/10 text-sm px-3 py-1.5 rounded-md">
            Reject all
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
        <input
          type="text"
          placeholder="Search For Delegates"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 bg-[#1e1e1e] border border-[#848484] text-white text-sm py-2 px-4 rounded-lg outline-none placeholder:text-white/40"
        />
      </div>

      {/* Guest List */}
      {filteredGuests.map((guest, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border border-[#848484] rounded-lg"
        >
          <div className="flex items-center gap-3">
             <img className='w-10 h-10' src={avatar}/> 
            <div>
              <p className="text-sm font-medium">{guest.email}</p>
              <p className="text-xs text-white/50">{guest.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-white text-black text-xs px-3 py-1 rounded-md">
              Let in
            </button>
            <button className="bg-red-500 text-white text-xs px-2 py-1 rounded-md">
              <X size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WaitingList;
