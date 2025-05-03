import React from 'react';
import Landing from '../components/Landing';
import Tagline from '../components/Tagline';
import EventPlans from '../components/EventPlans';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      <div className="relative z-10">
        <Landing />
      </div>
      <div className="relative z-20">
        <Tagline />
      </div>
      <div className="relative z-30">
        <EventPlans />
      </div>
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
