import React from 'react';
import logo from '../assets/logo.png';
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
        <div className="relative z-10 lg:hidden flex flex-col items-center text-center mt-60 ">
            <div className="flex items-center mb-2">
                <img src={logo} alt="Snaptiqz Logo" className="h-6 mr-2" />
                <span className="text-gray-300 font-light">SNAPTIQZ</span>
            </div>
            <p className="text-sm text-gray-300 max-w-xs mb-1">
                Snaptiqz is a free event hosting platform that empowers anyone to create, manage, and share events effortlessly.
            </p>
            <p className="text-xs text-gray-500 mb-6">
                *Payment gateway charges will be applicable
            </p>
            <hr className="border-gray-800 w-full mb-4" />

            <div className="flex justify-between text-sm text-gray-300 w-full max-w-xs mb-6 space-x-4">
                <a href="#">Events.</a>
                <a href="#">Communities.</a>
            </div>

            <div className="mb-4">
                <h3 className="text-white text-base mb-1">Contact Us</h3>
                <p className="text-gray-300 text-sm">+1 (999) 888-77-66</p>
                <p className="text-gray-300 text-sm">hello@logoipsum.com</p>
            </div>

            <div className="mb-6">
                <h3 className="text-white text-base mb-1">Location</h3>
                <p className="text-gray-300 text-sm">483920, Moscow</p>
                <p className="text-gray-300 text-sm">Myasnitskaya 22/2/5, Office 4</p>
            </div>

            <div className="flex justify-center space-x-3 mb-4">
                {[FaTelegram, FaInstagram, FaFacebookF, FaVk, FaOdnoklassniki].map((Icon, idx) => (
                    <button key={idx} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                        <Icon className="text-black text-sm" />
                    </button>
                ))}
            </div>

            <p className="text-xs text-gray-400">© 2025 — Copyright All Rights reserved</p>
            <p className="text-xs text-gray-400 mt-1">Privacy & terms</p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex z-10 justify-between px-6 mt-60">
            {/* Left Section */}
            <div className="w-1/3 space-y-4">
                <div className="flex items-center mb-2">
                    <img src={logo} alt="Snaptiqz Logo" className="h-6 mr-2" />
                    <span className="text-gray-300 font-light">SNAPTIQZ</span>
                </div>
                <p className="text-sm text-gray-300 max-w-sm">
                    Snaptiqz is a free event hosting platform that empowers anyone to create, manage, and share events effortlessly.
                </p>
                <p className="text-xs text-gray-500">
                    *Payment gateway charges will be applicable
                </p>
                <div className="flex space-x-2 pt-2">
                    {[FaOdnoklassniki, FaVk, FaFacebookF, FaTelegram, FaInstagram].map((Icon, idx) => (
                        <button key={idx} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
                            <Icon className="text-black text-sm" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Center Links */}
         

         {/* Right Section */}
         <div className="w-1/3 flex flex-col items-start text-left space-y-6">
{/* Top Right Links */}
<div className="flex space-x-40 text-sm text-gray-300 mb-6">
    <a href="#">Events.</a>
    <a href="#">Communities.</a>
</div>

{/* Contact Section */}
<div>
    <h3 className="font-medium text-white text-sm mb-1">Contact Us</h3>
    <p className="text-gray-300 text-sm">+1 (999) 888-77-66</p>
    <p className="text-gray-300 text-sm">hello@logoipsum.com</p>
</div>

{/* Location + Language side-by-side */}
<div className="flex flex-row space-x-8">
    {/* Location Section */}
    <div>
        <h3 className="font-medium text-white text-sm mb-1">Location</h3>
        <p className="text-gray-300 text-sm">483920, Moscow</p>
        <p className="text-gray-300 text-sm">Myasnitskaya 22/2/5, Office 4</p>
    </div>

    {/* Language Selector */}
    <div className="text-sm text-white mt-4">
  <span className="font-medium">Languages</span>
  <div className="mt-1">En &nbsp; Ma &nbsp; Hi &nbsp; Tm</div>
</div>

</div>
</div>

        </div>

        <style jsx>{`
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
