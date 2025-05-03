import React, { useState } from 'react';
import lightGlow from '../assets/Light_bg_bleu_35.png';

const EventPlans = () => {
  const [activeTab, setActiveTab] = useState('standard');

  const standardPlans = [
    {
      title: 'Free Events',
      subtitle: 'Basic options with > 200 participants',
      features: [
        'Attendee Registration',
        'Check-in',
        'Certificate Distribution',
        'Event Feedback and Review System',
        'Schedule PNG Upload',
        'Website Integration Support',
        'Registration Analytics Dashboard',
        'Custom Ticket Design Upload',
      ],
      button: 'Host Now',
    },
    {
      title: 'Paid Events',
      subtitle: 'Extra options with > 200 participants',
      features: [
        'Request-Based Access',
        'RSVP Management',
        'Attendee Registration',
        'Check-in',
        'Certificate Distribution',
        'Event Review System',
        'Schedule PNG Upload',
        'Website Integration',
        'Registration Analytics',
        'Custom Ticket Design Upload',
      ],
      button: 'Host Now',
    },
    {
      title: 'Large Scale',
      subtitle: 'Advanced options with > 500 participants',
      features: [
        'Attendee Registration',
        'Check-in System',
        'Certificate Generation',
        'Venue Mapping',
        'Stall Management',
        'Stage Management',
        'Exhibition Navigation',
        'Volunteer Management with',
        'Team-Based Access Control',
      ],
      footer: 'And much more......',
      button: 'Contact Us',
    },
  ];

  return (
<div
  className="relative text-white font-sans pb-[20vh] sm:pb-[30vh] px-4 overflow-hidden"
  style={{
    background: `linear-gradient(to bottom, #000000 0%, #0a0c12 20%, #0c0d10 60%)`,
  }}
>





      {/* Dotted Grid Top Half */}
      <div
  className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
  style={{
    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 2px)`,
    backgroundSize: '20px 20px',
    maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)',
  }}
/>


      {/* Stars Bottom Half */}
      <div className="absolute bottom-0 left-0 w-full h-[40%] z-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white opacity-20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: 'twinkle 2s infinite ease-in-out',
            }}
          />
        ))}
      </div>

      <style>
        {`@keyframes twinkle { 0%, 100% { opacity: 0.2 } 50% { opacity: 0.6 } }`}
      </style>

      {/* HOST heading */}
     {/* HOST Text */}
     {/* Fade shadow above HOST */}
<div className="absolute top-0 left-0 w-full h-[10%] z-10 pointer-events-none" 
     style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }} />

<h1
  className="w-full mt-5 text-[28vw] sm:text-[20vw] md:text-[16vw] font-extrabold uppercase select-none text-center leading-none tracking-wide mb-[20px] z-10"
  style={{
    WebkitTextStroke: '1.5px rgba(160, 160, 160, 1)',  // same as NOW
    WebkitTextFillColor: 'transparent',
  }}
>
  HOST
</h1>



      {/* Title & Subtitle */}
      <div className="relative text-center z-20 mb-14">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">EVENT PLANS</h2>
        <p className="text-sm text-gray-400">Choose your plans</p>
      </div>

      {/* Toggle Buttons */}
      <div className="relative flex justify-center mb-20 z-20">
        <img
          src={lightGlow}
          alt="glow"
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] object-contain pointer-events-none z-10"
        />

        <div
          className="relative flex gap-2 px-2 py-2 rounded-full border border-gray-400/50 backdrop-blur-md shadow-[inset_0_0_5px_rgba(255,255,255,0.1),0_0_30px_rgba(255,255,255,0.15)]"
          style={{ background: 'linear-gradient(180deg, #1D2235 0%, #0C0D10 100%)' }}
        >
          <button
            className={`px-6 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 min-w-[130px] ${activeTab === 'standard' ? 'bg-white text-black shadow-inner' : 'text-white bg-transparent hover:bg-white/10'}`}
            onClick={() => setActiveTab('standard')}
          >
            STANDARD PLANS
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 min-w-[130px] ${activeTab === 'special' ? 'bg-white text-black shadow-inner' : 'text-white bg-transparent hover:bg-white/10'}`}
            onClick={() => setActiveTab('special')}
          >
            SPECIAL PLANS
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[10%] z-50 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />

{/* NOW Text */}

{/* NOW Text */}
<div className="absolute inset-0 flex items-end justify-center pointer-events-none">

<h1
className="w-full text-[26vw] z-30 sm:text-[20vw] md:text-[16vw] font-extrabold uppercase select-none text-center leading-none tracking-tight pb-10 sm:pb-0 "
style={{
WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',  // much brighter white stroke
WebkitTextFillColor: 'transparent',

}}
>
NOW
</h1>

</div>

      {/* Cards */}
      <div className="relative flex flex-col items-center gap-10 z-40">
        {standardPlans.map((plan, index) => (
          <div
          key={index}
          className="relative w-full max-w-sm rounded-[32px] border border-gray-300/30 bg-transparent backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] overflow-hidden"
        >
        
            <img
              src={lightGlow}
              alt="card glow"
              className="absolute -top-120 left-1/2 -translate-x-1/2  object-contain  z-90 pointer-events-none"
            />

<div
  className="relative z-40 px-6 py-8 rounded-[32px]"
  style={{
    background: 'transparent', // fully transparent background
    backdropFilter: 'blur(20px)', // keeps glassy blur
    WebkitBackdropFilter: 'blur(20px)',
  }}
>

              <h3 className="text-3xl text-center font-semibold text-white mb-1">{plan.title}</h3>
              <p className="text-sm text-center text-gray-300 mb-6">{plan.subtitle}</p>

              <div className="flex justify-center">
  <ul className="text-sm space-y-3 text-white mb-6">
    {plan.features.map((feature, idx) => (
      <li key={idx} className="flex items-start">
        <span className="text-white mr-2 flex-shrink-0">✓</span>
        <span className="text-gray-300">{feature}</span>
      </li>
    ))}
  </ul>
</div>


              {plan.footer && <p className="text-sm text-gray-300 mb-6 text-center">{plan.footer}</p>}

              <button
  className="w-full py-3 rounded-full bg-gradient-to-b from-white to-gray-200 text-black font-semibold text-sm border border-white/90 shadow-[0_0_10px_rgba(255,255,255,0.35),0_0_5px_rgba(255,255,255,0.25),inset_0_2px_4px_rgba(255,255,255,0.4),0_6px_20px_rgba(0,0,0,0.3)]"
>
  {plan.button}
</button>

            </div>
          </div>
        ))}
      </div>

      {/* Black fade overlay above NOW */}
      
    

    </div>
  );
};

export default EventPlans;