import React, { useEffect, useRef, useState } from 'react';
import Landing from '../components/Landing';
import Tagline from '../components/Tagline';
import EventPlans from '../components/EventPlans';
import Footer from '../components/Footer';
import logo from '../assets/logo.svg'; // Ensure this path is correct

const Home = () => {
  const footerRef = useRef(null);
  const [hideLogo, setHideLogo] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const footerTop = footerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      setHideLogo(footerTop < windowHeight);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
   <div className="w-full min-h-screen bg-[#010205] ">


      <div className="relative z-10">
        <Landing />
      </div>
      <div className="relative z-20">
        <Tagline />
      </div>
      <div className="relative z-30">
        <EventPlans />
      </div>

      {/* Fixed Logo */}
      <img
        src={logo}
        alt="logo"
        className={`fixed z-50 transition-opacity duration-500 ${
          hideLogo ? 'opacity-0' : 'opacity-100'
        } ${isMobile ? 'top-4 left-4 w-9' : 'bottom-4 left-6 w-10'}`}
      />

      <div className="relative z-20" ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
