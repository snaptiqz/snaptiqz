import React from 'react'
import TopNavbar from '../components/TopNavbar'
import StarryBackground from '../components/StarryBackground'

const Notification = () => {
  return (
    <div
      className="min-h-screen w-full text-white bg-[#010205] relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at top, rgba(0, 70, 255, 0.1) 0%, transparent 20%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
        <TopNavbar />
        <StarryBackground count={60} />
      
    </div>
  )
}

export default Notification
