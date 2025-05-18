import React, { useEffect, useState } from 'react';
import { Search, Compass } from 'lucide-react';
import logo from '../assets/logo.svg';

const TopNavbar = ({ scrollRef }) => {
  const [visible, setVisible] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const scrollElement = scrollRef?.current;

    if (!scrollElement) return;

    const handleScroll = () => {
      const currentScrollY = scrollElement.scrollTop;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    scrollElement.addEventListener('scroll', handleScroll);

    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-in-out ${
       visible ? 'opacity-100' : 'opacity-0'
      } bg-transparent flex justify-between items-center px-4 py-4`}
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
