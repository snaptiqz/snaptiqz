import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  PartyPopper,
  TicketCheck,
  Plus,
  Bell,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useNavigate,useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import avatar from '../assets/avatar.svg';


const BottomNavbar = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(() => {
  const stored = sessionStorage.getItem("navbarCollapsed");
  return stored ? JSON.parse(stored) : false;
});



  const icons = [
    { icon: <PartyPopper size={24} />, path: '/dashboard' },
    { icon: <TicketCheck size={24} />, path: '/tickets' },
    { icon: <Plus size={26} />, path: '/create_event' },
    { icon: <Bell size={24} />, path: '/notifications' },
    {
      icon: (
        <img
          src={user?.imageUrl || avatar}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      ),
      path: '/organization_profile',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const nearBottom =
        window.innerHeight + scrollY >= document.body.offsetHeight - 200;

      if (nearBottom) setVisible(true);
      else if (scrollY > lastScrollY.current) setVisible(false);
      else setVisible(true);

      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 

const toggleCollapse = () => {
  setCollapsed((prev) => {
    sessionStorage.setItem("navbarCollapsed", JSON.stringify(!prev));
    return !prev;
  });
};




  return (
    <div
      className={`fixed bottom-4 z-50 transition-all duration-300
       ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}
       ${collapsed ? 'right-0' : 'left-2 right-2'}
      `}
    >
      <div className={`flex ${collapsed ? 'justify-end' : 'justify-center'}`}>
        <div
          ref={navbarRef}
          className={`h-16 flex items-center border border-white/10 shadow-lg
            bg-[#1a1a1a] backdrop-blur-md transition-all duration-300 overflow-hidden
            ${collapsed ? 'justify-end rounded-l-2xl rounded-tr-md rounded-br-md ml-auto'
                    : 'w-full max-w-md justify-center rounded-3xl'}
          `}
        >
          {!collapsed && (
            <div className="flex-1 flex items-center justify-between px-6">
              {icons.map(({ icon, path }, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(path)}
                  className={`text-white hover:scale-110 transition p-2 rounded-full flex-shrink-0
                    ${location.pathname === path ? '[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.5))]' : ''}
                    hover:[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.7))]`}
                >
                  {icon}
                </button>
              ))}
            </div>
          )}
          <div className="flex justify-center items-center">
            <button
              onClick={toggleCollapse}
              className="text-white  p-1 rounded-sm transition [filter:drop-shadow(0_0_8px_rgba(255,255,255,0.5))] hover:[filter:drop-shadow(0_0_12px_rgba(255,255,255,0.7))]"
            >
              {collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;