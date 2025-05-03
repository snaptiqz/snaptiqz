// src/components/Spinner.jsx
import React from 'react';
import img13 from '../assets/13.svg';
import img22 from '../assets/22.svg';
import img23 from '../assets/23.svg';

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-24 h-24">
        <img
          src={img13}
          alt="outer"
          className="absolute inset-0 w-full h-full animate-spin-slow"
          style={{ animationDuration: '6s' }}
        />
        <img
          src={img22}
          alt="middle"
          className="absolute inset-[12.5%] w-[75%] h-[75%] animate-spin-reverse"
          style={{ animationDuration: '4s' }}
        />
        <img
          src={img23}
          alt="inner"
          className="absolute inset-[25%] w-[50%] h-[50%] animate-spin-slow"
          style={{ animationDuration: '3s' }}
        />
      </div>
    </div>
  );
};

export default Spinner;
