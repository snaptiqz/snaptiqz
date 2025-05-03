import React, { useState } from 'react';
import lightGlow from '../assets/Light_bg_bleu_35.svg';
import greyCurve from '../assets/grey_layers.svg';
import { motion } from 'framer-motion';
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
    className="relative text-white font-sans pb-[20vh] sm:pb-[30vh] px-4 overflow-hidden bg-[#020308]"
    
  >
  
        
      {/* Dotted Grid Top Half */}
      <div className="block sm:block md:block lg:block xl:block 2xl:block">   {/* Dotted Grid Top Half (fades on mobile) */}
<div
  className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
  style={{
    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 2px)`,
    backgroundSize: '20px 20px',
    WebkitMaskImage:
      'linear-gradient(to bottom, transparent 0%, black 20%, black 60%, transparent 80%)',
    maskImage:
      'linear-gradient(to bottom, transparent 0%, black 20%, black 60%, transparent 80%)',
  }}
/>
</div>



      {/* Desktop Curve */}
   {/* Grey Curve */}
   <motion.img
  src={greyCurve}
  alt="curve effect"
  initial={{ opacity: 0.4 }}
  animate={{ opacity: [0.4, 0.6, 0.4] }}
  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  className="hidden sm:block absolute top-[-35%] left-[-20%] w-[200vw] max-w-[2050px] z-40 pointer-events-none"
/>
{/* Purple Glow Layer Behind */}




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

      {/* HOST fade shadow */}
      <div className="absolute top-0 left-0 w-full h-[10%] sm-h[50%] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }} />

      {/* HOST Text */}
      <h1
        className="w-full  text-[28vw] sm:text-[20vw] md:text-[16vw] font-extrabold uppercase select-none text-center leading-none tracking-wide mb-[20px] z-10"
        style={{
          WebkitTextStroke: '1.5px rgba(160, 160, 160, 1)',
          WebkitTextFillColor: 'transparent',
        }}
      >
        HOST
      </h1>

      {/* Title & Subtitle */}
      <div className="relative text-center z-20 mb-14">
      <p className="text-2xl sm:text-3xl md:text-6xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent sm:mt-4 mb-5">
  EVENT PLANS
</p>

        <p className="text-lg text-gray-300">Choose your plans</p>
      </div>

      {/* Toggle Buttons */}
      <div className="relative flex justify-center mb-20 z-20">
        {/* Mobile Glow Only */}
        <img
          src={lightGlow}
          alt="glow"
           className="absolute -top-20 left-1/2 -translate-x-1/2  object-contain  z-40 pointer-events-none"

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

      {/* NOW Background Fade */}
      <div className="absolute bottom-0 left-0 w-full h-[10%] z-50 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />

      {/* NOW Text */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <h1
          className="w-full text-[26vw] z-30 sm:text-[20vw] md:text-[16vw] font-extrabold uppercase select-none text-center leading-none tracking-tight pb-10 sm:pb-0"
          style={{
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
            WebkitTextFillColor: 'transparent',
          }}
        >
          NOW
        </h1>
      </div>

      {/* Cards Section */}
      <div className="relative flex flex-col sm:flex-row justify-center items-center sm:items-stretch gap-10 z-40 flex-wrap">

        {standardPlans.map((plan, index) => (
          <div
            key={index}
            className="relative w-full max-w-sm border-t-[2px]  rounded-[32px] border-gray-300/90 bg-transparent backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] overflow-hidden"

          >
<motion.img
  src={lightGlow}
  alt="card glow"
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.8 }}
  transition={{ duration: 1.6, ease: 'easeOut' }}
  className="absolute -top-32 left-1/2 -translate-x-1/2 w-[400px] h-[400px] blur-2xl object-contain pointer-events-none z-[99] mix-blend-screen"
/>


          <div
  className="relative z-40 px-6 py-8 rounded-[32px] h-full flex flex-col"
  style={{
    background: 'linear-gradient(180deg, rgba(29,34,53,0.6) 0%, rgba(12,13,16,0.6) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  }}
>


<h3 className="text-3xl text-center font-semibold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent mb-1">
  {plan.title}
</h3>

              <p className="text-sm text-center mb-6 bg-gradient-to-b from-black to-gray-300 bg-clip-text text-transparent opacity-90">
  {plan.subtitle}
</p>


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
  className="w-full py-3 mt-auto rounded-full bg-gradient-to-b from-white to-gray-200 text-black font-semibold text-sm border border-white/90 shadow-[0_0_10px_rgba(255,255,255,0.35),0_0_5px_rgba(255,255,255,0.25),inset_0_2px_4px_rgba(255,255,255,0.4),0_6px_20px_rgba(0,0,0,0.3)]"
>
  {plan.button}
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPlans;
