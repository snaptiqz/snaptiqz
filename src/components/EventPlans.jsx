import React, { useState } from 'react';
import lightGlow from '../assets/Light_bg_bleu_35.svg';
import greyCurve from '../assets/grey_layers.svg';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
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
  className="relative text-white font-sans pb-[8vh] lg:pb-[80vh] md:pb-[20vh] px-4 bg-[#010205] overflow-y-auto overflow-x-hidden scrollbar-hide "
>



  
        
      {/* Dotted Grid Top Half */}
     <div className="block sm:block md:block lg:block xl:block 2xl:block ">
  <div
    className="absolute top-0 left-0 w-full sm:h-1/2 h-2/4 z-0 pointer-events-none bg-[#010205]"
    style={{
      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 2px)`,
      backgroundSize: '24px 24px',
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
  className="hidden sm:block absolute lg:top-[-15%] md:top-[-15%] md:left-[-25%] md:w-[200vw]  w-[300vw] max-w-[2050px] z-40 pointer-events-none"
/>
{/* Purple Glow Layer Behind */}




      {/* Stars Bottom Half */}
      <div className="absolute bottom-0 left-0 w-full h-[50%] z-0 pointer-events-none">
        {[...Array(90)].map((_, i) => (
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
    
<div className="relative z-20 mt-[200px] sm:mt-[300px] ">
 
    <div className="relative w-full h-[180px] sm:h-[300px] md:h-[400px] lg:h-[400px] xl:h-[400px] overflow-hidden flex justify-center items-center">
     

      <h1
        className="absolute left-0 right-0 text-[120px]  sm:p-0 sm:text-[500px] md:text-[350px] lg:text-[400px] xl:text-[500px] font-extrabold uppercase text-center leading-none tracking-tight z-10 font-poppins"
        style={{
          WebkitTextStroke: '2px rgba(160, 160, 160, 0.8)',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.1) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.1) 100%)'
        }}
      >
        HOST
      </h1>
    </div>

    {/* Title & Subtitle */}
  <div className="text-center ">
    <p className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent  mb-5">
      EVENT PLANS
    </p>
    <p className="text-lg sm:text-xl md:text-2xl mb-4   text-gray-300">Choose your plans</p>
  </div>

  {/* Toggle Buttons */}
  <div className="flex justify-center mb-20 sm:mb-10">
 

   <div
  className="relative flex gap-2  px-2 py-2 rounded-full border border-gray-400/50 backdrop-blur-md shadow-[0_0_12px_rgba(255,255,255,0.12)]"
  style={{ background: 'linear-gradient(180deg, #1D2235 0%, #0C0D10 100%)' }}
>
  <button
    className={`px-6 py-[6px] rounded-full font-semibold text-sm sm:text-base min-w-[130px] transition-all duration-300 ${
      activeTab === 'standard'
        ? 'text-black'
        : 'text-white hover:bg-white/10'
    }`}
    onClick={() => setActiveTab('standard')}
    style={
      activeTab === 'standard'
        ? {
            background: 'linear-gradient(to bottom, #ffffff, #bcbcbc)',
            boxShadow: '0 0 10px rgba(255,255,255,0.35), inset 0 2px 4px rgba(255,255,255,0.4)',
          }
        : {}
    }
  >
    STANDARD PLANS
  </button>

  <button
    className={`px-6 py-[6px] rounded-full font-semibold text-sm sm:text-base min-w-[130px] transition-all duration-300 ${
      activeTab === 'special'
        ? 'text-black'
        : 'text-white hover:bg-white/10'
    }`}
    onClick={() => setActiveTab('special')}
    style={
      activeTab === 'special'
        ? {
            background: 'linear-gradient(to bottom, #ffffff, #bcbcbc)',
            boxShadow: '0 0 10px rgba(255,255,255,0.35), inset 0 2px 4px rgba(255,255,255,0.4)',
          }
        : {}
    }
  >
    SPECIAL PLANS
  </button>
</div>

  </div>
</div>


    

    
      


      {/* Cards Section */}
     

      <div className=" relative grid gap-9 z-40 px-4 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center
">

        {standardPlans.map((plan, index) => (
       <motion.div
  key={index}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 0.8, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}

  transition={{
    duration: 0.6,
    ease: 'easeOut',
    delay: index * 0.15
  }}
  className="relative w-full max-w-sm overflow-hidden border-t-[2px] rounded-[52px] border-gray-300/90 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
  style={{
    background: 'linear-gradient(135deg, rgba(29,34,53,0.5) 20%, rgba(12,13,16,0.5) 80%)',

   
    boxShadow: '0 4px 40px rgba(255, 255, 255, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.03) inset',
  }}
>



      
         <motion.img
           src={lightGlow}
           alt="card glow"
           loading="lazy"
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.8 }}
           transition={{ duration: 1.6, ease: 'easeOut' }}
           className="absolute -top-32 left-1/2 -translate-x-1/2 w-[400px] h-[400px] blur-2xl object-contain pointer-events-none z-[99] mix-blend-screen"
         />
       
         <div
           className="relative z-60 px-6 py-8 rounded-[32px] h-full flex flex-col"
           style={{
             background: 'linear-gradient(180deg, rgba(29,34,53,0.4) 0%, rgba(12,13,16,0.2) 100%)',
             backdropFilter: 'blur(20px)',
             WebkitBackdropFilter: 'blur(40px)',
             border: '1px solid rgba(255, 255, 255, 0.1)'
           }}
         >
           <h3 className="text-3xl text-center font-semibold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent mb-1">
             {plan.title}
           </h3>
       
           <p className="text-sm text-center mb-6 bg-gradient-to-b from-gray-600 to-gray-100 bg-clip-text text-transparent ">
             {plan.subtitle}
           </p>
       
           <div className="flex justify-center">
             <ul className="text-sm space-y-3 text-white mb-6">
               {plan.features.map((feature, idx) => (
                 <li key={idx} className="flex items-start">
  <Check size={16} className="text-white mt-[2px] mr-2 flex-shrink-0" />
  <span className="text-gray-300">{feature}</span>
</li>

               ))}
             </ul>
           </div>
       
           {plan.footer && (
             <p className="text-sm text-gray-300 mb-6 text-center">{plan.footer}</p>
           )}
       
           <button className="w-full py-3 mt-auto rounded-full bg-gradient-to-b from-white to-gray-200 text-black font-semibold text-sm border border-white/90 shadow-[0_0_10px_rgba(255,255,255,0.35),0_0_5px_rgba(255,255,255,0.25),inset_0_2px_4px_rgba(255,255,255,0.4),0_6px_20px_rgba(0,0,0,0.3)]">
             {plan.button}
           </button>
         </div>
       </motion.div>
       
        ))}
      </div>
      <div className="relative z-20   ">
  
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden flex justify-center items-center">
 
  <h1
    className="absolute left-0 right-0 text-[120px] sm:text-[500px] md:text-[350px] lg:text-[400px] xl:text-[500px] font-extrabold uppercase text-center leading-none tracking-tight z-10 font-poppins"
    style={{
      WebkitTextStroke: '2px rgba(160, 160, 160, 0.9)', // Reduced opacity
      WebkitTextFillColor: 'transparent',
      lineHeight: 1,
      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,6) 0%, rgba(0,0,0,0.1) 60%)',
      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.1) 100%)',
    }}
  >
    NOW
  </h1>
</div>




</div>

      </div>
 
  );
};

export default EventPlans;
