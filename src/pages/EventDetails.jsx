import React, { useState, useEffect, useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import StarryBackground from '../components/StarryBackground';
import { EventContext } from '../context/EventContext';
import { Target, Users, History, Award, IndianRupee } from 'lucide-react';

import Overview from '../components/Overview';
import Guests from '../components/Guests';
import WaitingList from '../components/WaitingList';
import Certificates from '../components/Certificates';
import Spinner from '../components/Spinner';
import Payments from '../components/Payments';

const EventDetails = () => {
  const [activeTab, setActiveTab] = useState('Overview');


  const { id: eventId } = useParams(); // e.g. from /event/:id
  const [searchParams] = useSearchParams();
  const organizationId = searchParams.get('orgId'); 
  const { useEventById } = useContext(EventContext);
const { data: event, isLoading, isError } = useEventById(eventId, organizationId);// from ?orgId=xyz

  
 if (isLoading) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#010205] text-white">
      <Spinner />
    </div>
  );
}

  const tabs = [
    { label: 'Overview', icon: <Target size={18} />, component: <Overview event={event} /> },
    { label: 'Guests', icon: <Users size={18} />, component: <Guests event={event} /> },
    { label: 'Waiting list', icon: <History size={18} />, component: <WaitingList event={event} /> },
    { label: 'Certificate', icon: <Award size={18} />, component: <Certificates event={event} /> },
    { label:'Payment',icon:<IndianRupee size={18} />,component:<Payments event={event} />},
  ];

  const ActiveComponent = tabs.find(tab => tab.label === activeTab)?.component;

  return (
    <div
      className="min-h-screen w-full text-white bg-[#010205] pt-16 relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at top, rgba(0, 70, 255, 0.1) 0%, transparent 20%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <TopNavbar />
      <StarryBackground count={60} />

      {/* Tabs */}
      <div className="flex justify-start gap-8 px-2 mt-10 overflow-x-auto border-b border-white/60">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-start gap-2 px-1 text-md whitespace-nowrap font-medium transition-colors ${
              activeTab === tab.label
                ? 'text-white border-b-2 border-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render Active Tab Component */}
      <div className="p-6 z-20">{ActiveComponent}</div>
    </div>
  );
};

export default EventDetails;
