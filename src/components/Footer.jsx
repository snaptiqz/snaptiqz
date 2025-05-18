import React from 'react';
import logo from '../assets/logo.svg';
import { FaTelegram, FaInstagram, FaFacebookF, FaVk, FaOdnoklassniki } from 'react-icons/fa';

const Footer = () => {
return (
    <footer
        className="relative w-full text-white font-sans overflow-hidden px-6 py-8"
        style={{
            background: 'linear-gradient(to bottom, #000000 0%, #020308 100%)',
        }}
    >
        {/* Stars background */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            {[...Array(40)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-white rounded-full opacity-20 animate-pulse"
                    style={{
                        width: `${Math.random() * 2 + 1}px`,
                        height: `${Math.random() * 2 + 1}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                    }}
                />
            ))}
        </div>

        {/* Mobile Layout */}
        <div className="relative z-10 lg:hidden flex flex-col items-center text-center mt-60 sm:mt-2 ">
            <div className="flex items-center mb-2">
                <img src={logo} alt="Snaptiqz Logo" className="h-6 mr-2" />
                <span className="text-gray-300 font-light">SNAPTIQZ</span>
            </div>
            <p className="text-md text-gray-300 max-w-xs mb-1">
                Snaptiqz is a free event hosting platform that empowers anyone to create, manage, and share events effortlessly.
            </p>
            <p className="text-sm text-gray-500 mb-6">
                *Payment gateway charges will be applicable
            </p>
            <hr className="border-gray-800 w-full mb-4" />

            <div className="flex justify-between text-md text-gray-300 w-full max-w-xs mb-6 space-x-4">
                <a href="#">Events.</a>
                <a href="#">Communities.</a>
            </div>

            <div className="mb-4">
                <h3 className="text-white text-base mb-1">Contact Us</h3>
                <p className="text-gray-300 text-md">+1 (999) 888-77-66</p>
                <p className="text-gray-300 text-md">hello@logoipsum.com</p>
            </div>

            <div className="mb-6">
                <h3 className="text-white text-base mb-1">Location</h3>
                <p className="text-gray-300 text-md">483920, Moscow</p>
                <p className="text-gray-300 text-md">Myasnitskaya 22/2/5, Office 4</p>
            </div>

            <div className="flex justify-center space-x-3 mb-4">
                {[FaTelegram, FaInstagram, FaFacebookF, FaVk, FaOdnoklassniki].map((Icon, idx) => (
                    <button key={idx} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                        <Icon className="text-black text-md" />
                    </button>
                ))}
            </div>

            <p className="text-sm text-gray-400">© 2025 — Copyright All Rights reserved</p>
            <p className="text-sm text-gray-400 mt-1">Privacy & terms</p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex z-10 justify-between px-16 py-16 gap-20">
  {/* Left Section */}
  <div className="w-1/3 space-y-6">
    <div className="flex items-center">
      <img src={logo} alt="Snaptiqz Logo" className="h-6 mr-2" />
      <span className="text-gray-300 font-light text-lg">SNAPTIQZ</span>
    </div>
    <p className="text-md text-gray-300 max-w-sm leading-relaxed">
      Snaptiqz is a free event hosting platform that empowers anyone to create, manage, and share events effortlessly.
    </p>
    <p className="text-sm text-gray-500">*Payment gateway charges will be applicable</p>

    <div className="grid grid-cols-2 gap-3 pt-4 w-max">
  {[FaOdnoklassniki, FaVk,  FaFacebookF,FaTelegram, FaInstagram ,].map((Icon, idx) => (
    <button
      key={idx}
      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
    >
      <Icon className="text-black text-base" />
    </button>
  ))}
</div>


  </div>

  {/* Right Section */}
  <div className="w-1/3 flex flex-col items-start text-left space-y-10">
    {/* Top Right Links */}
    <div className="flex space-x-24 text-md text-gray-300">
      <a href="#" className="hover:text-white transition">Events.</a>
      <a href="#" className="hover:text-white transition">Communities.</a>
    </div>

    {/* Contact Section */}
    <div>
      <h3 className="font-semibold text-white text-base mb-1">Contact Us</h3>
      <p className="text-gray-300 text-md">+1 (999) 888-77-66</p>
      <p className="text-gray-300 text-md">hello@logoipsum.com</p>
    </div>

    {/* Location + Language side-by-side */}
    <div className="flex flex-row justify-between w-full space-x-12">
      {/* Location */}
      <div>
        <h3 className="font-semibold text-white text-base mb-1">Location</h3>
        <p className="text-gray-300 text-md">483920, Moscow</p>
        <p className="text-gray-300 text-md">Myasnitskaya 22/2/5, Office 4</p>
      </div>

      {/* Language */}
      <div>
        <h3 className="font-semibold text-white text-base mb-1">Languages</h3>
        <p className="text-gray-300 text-md">En &nbsp; Ma &nbsp; Hi &nbsp; Tm</p>
      </div>
    </div>
  </div>
</div>


        <style >{`
            @keyframes pulse {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.6; }
            }
            .animate-pulse {
                animation: pulse 3s infinite;
            }
        `}</style>
    </footer>
);
};

export default Footer;
