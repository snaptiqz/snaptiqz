import React, { useEffect, useState, useRef } from 'react';
import { Rocket } from 'lucide-react';

const Spinner = () => {
  const animationRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [scale, setScale] = useState(1);
  
  // Generate stars
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    opacity: Math.random() * 0.6 + 0.3,
  }));
  
  useEffect(() => {
    let startTime;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      
      const breathe = 1 + Math.sin(elapsed / 800) * 0.03;
      const offset = Math.sin(elapsed / 1000) * 8;
      
      setScale(breathe);
      setOffsetY(offset);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#010205] z-50" style={{
        backgroundImage: `radial-gradient(circle at top, rgba(255,255,255,0.1) 0%, transparent 30%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      {/* Star background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: star.top,
              left: star.left,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      
      {/* Rocket + Flame */}
      <div 
        className="relative z-10 flex flex-col items-center"
        style={{
          transform: `translateY(${offsetY}px) scale(${scale})`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div
  style={{
    transform: 'rotate(-48deg)',
    perspective: '500px',
  }}
  className="shadow-xl drop-shadow-[0_4px_10px_rgba(0,255,255,0.2)]"
>
  <div
    className="transition-transform"
    style={{
      transform: 'rotateX(10deg) rotateY(6deg)',
      filter: 'drop-shadow(0 4px 8px rgba(0, 255, 255, 0.4))',
    }}
  >
  <Rocket size={48} strokeWidth={0.8} color="rgba(255,255,255,0.8)" />

  </div>
</div>

        
       {/* Improved flame effect with tapered beams */}
<div className="flex gap-1 " style={{ transform: 'translateX(-4px)' }}>

          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="relative h-12 animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Gradient flame beam with tapered bottom */}
              <div 
                className="absolute w-2 bg-gradient-to-t from-transparent to-cyan-400 blur-sm opacity-70"
                style={{
                  height: `${16 + Math.random() * 16}px`,
                  borderRadius: '0 0 12px 12px',
                  animation: 'flicker 0.5s ease-in-out infinite alternate',
                }}
              ></div>
              
              {/* Brighter inner core */}
              <div 
                className="absolute w-[2px] bg-gradient-to-t from-transparent to-white blur-sm opacity-90"
                style={{
                  left: '4px',
                height: `${28 + Math.random() * 8}px`,


                  borderRadius: '0 0 8px 8px',
                  animation: 'flicker 0.3s ease-in-out infinite alternate',
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spinner;