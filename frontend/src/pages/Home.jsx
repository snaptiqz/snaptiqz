import React from 'react';
import Landing from '../components/Landing';
import Tagline from '../components/Tagline';

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      <div className="relative z-10">
        <Landing />
      </div>
      <div className="relative z-20">
        <Tagline />
      </div>
    </div>
  );
};

export default Home;
