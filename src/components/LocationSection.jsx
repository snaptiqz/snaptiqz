import React from 'react';
import { MapPin, LaptopMinimal } from 'lucide-react';
import PhotonLocationInput from './PhotonLocationInput';

const LocationSection = ({ isVirtual, setIsVirtual, virtualLink, setVirtualLink, location, setLocation }) => {
  return (
    <div className="space-y-3">
      {/* Toggle Button Group */}
      <div className="flex gap-0 bg-[#2b2b2b] overflow-hidden rounded-xl border border-white/20 w-full">
        {/* Offline Tab */}
        <button onClick={() => setIsVirtual(false)} className="flex-1 text-white">
          <div className={`m-1 rounded-lg px-4 py-3 flex items-start gap-3 transition ${!isVirtual ? 'bg-[#181818]' : ''}`}>
            <MapPin size={16} className="mt-1" />
            <div className="text-left">
              <div className="text-sm font-medium">Add Event Location</div>
              <div className="text-xs text-white/70">Offline Location</div>
            </div>
          </div>
        </button>

        {/* Virtual Tab */}
        <button onClick={() => setIsVirtual(true)} className="flex-1 bg-transparent text-white">
          <div className={`m-1 rounded-lg px-4 py-3 flex items-start gap-3 transition ${isVirtual ? 'bg-[#181818]' : ''}`}>
            <LaptopMinimal size={16} className="mt-1" />
            <div className="text-left">
              <div className="text-sm font-medium">Add Virtual Link</div>
              <div className="text-xs text-white/70">Virtual Event</div>
            </div>
          </div>
        </button>
      </div>

      {/* Input Field */}
      {isVirtual ? (
        <div className="relative">
          <LaptopMinimal className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={16} />
          <input
            type="url"
            placeholder="Enter Virtual Link"
            value={virtualLink}
            onChange={(e) => setVirtualLink(e.target.value)}
            className="pl-10 pr-4 py-3 w-full bg-[#2b2b2b] border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:border-white/40"
          />
        </div>
      ) : (
        <div className="relative">
          <PhotonLocationInput location={location} setLocation={setLocation} />
        </div>
      )}
    </div>
  );
};

export default LocationSection;
