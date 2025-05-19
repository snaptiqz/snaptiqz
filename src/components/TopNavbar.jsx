import React, { useEffect, useState,useRef } from 'react';
import { Search, Compass } from 'lucide-react';
import logo from '../assets/logo.svg';

const TopNavbar = ({ }) => {
  const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY < 50) {
      setVisible(true); // Near top — show navbar
    } else if (scrollY > lastScrollY.current) {
      setVisible(false); // Scrolling down — hide navbar
    } else if (scrollY < lastScrollY.current) {
      setVisible(true); // Scrolling up — show navbar
    }

    lastScrollY.current = scrollY;
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);



  return (
  <div
  className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-in-out
  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
  bg-transparent flex justify-between items-center px-4 py-4`}

>

      <img src={logo} alt="Snaptiqz Logo" className="h-5" />
      <div className="flex gap-4 text-white/80">
        <button className="flex items-center gap-1 hover:text-white transition text-sm">
          <Compass size={18} />
          <span>Organizations</span>
        </button>
        <button className="hover:text-white transition">
          <Search size={18} />
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
