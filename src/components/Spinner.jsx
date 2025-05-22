import React, { useEffect, useState, useRef } from 'react';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Spinner = () => {
  const animationRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [scale, setScale] = useState(1);
  const [shuffledMessages, setShuffledMessages] = useState([]);
const [messageIndex, setMessageIndex] = useState(0);
const [displayedText, setDisplayedText] = useState('');


  const generalMessages = [
    "Still faster than your 8 AM alarm...",
    "Loading… because teleportation isn’t ready yet.",
    "Just a sec… bribing the server hamster.",
    "Our rocket's warming up. Hold tight!",
    "Snaptiqz is buffering your fun.",
    "Blink twice if you’re still waiting...",
    "Your data’s partying backstage. Coming soon.",
    "Pulling strings behind the curtain…",
    "Giving pixels a pep talk...",
    "This isn’t a lag, it’s dramatic timing.",
    "Making everything look cooler ...",
     "Even this loading screen has better attendance.",
    "Moonwalking through server traffic...",
    "Snaptiqz is vibing with the universe.",
    "Please enjoy this loading performance.",
    "Manifesting magic… almost there.",
    "The launch was delayed… classic Snaptiqz.",
  "Blink twice if you skipped today’s class.",
  "Assembling the guest list — you’re obviously VIP.",
  "Unlocking the secret to low effort, high fun...",
   "Looking for events with free pizza...",
     "Hope your ex isn’t hosting this one!",
  "Checking attendance… psych. We don’t do that here.",
  "Even this loading screen has better attendance.",
  "Launching in 3… 2… nope, still loading.",
  "Just debugging the universe.",
  "Fetching data from a parallel dimension…",
  "Planning your next ‘accidental’ run-in with your crush…",
  "Downloading motivation…",
 " Finding signal... through cosmic interference",
  "Be right there. Just fixing the space-time continuum.",
  "Current status: spinning in existential crisis.",
  "Just warming up the rocket boosters...",
  "We didn’t forget, just loading...",
   "Hope there’s free food in this one...",
   "Trying to reach our inner peace and the server.",
   "Loading… our vibes must align first.",
   "Daydreaming about bumping into them at registration…👀",
   "Importing fun… please install patience.",
   "Staring at this won’t make it faster, but hey.",
   "You’ve reached the fun part: waiting.",
   "What if… this is the whole experience?",
  


  ];

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

  // Rotate message every 3s
  useEffect(() => {
  // Shuffle messages once
  const shuffled = [...generalMessages].sort(() => 0.5 - Math.random());
  setShuffledMessages(shuffled);

  const interval = setInterval(() => {
    setMessageIndex((prev) => (prev + 1) % shuffled.length);
  }, 6000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  if (shuffledMessages.length > 0) {
    setDisplayedText(shuffledMessages[messageIndex]);
  }
}, [messageIndex, shuffledMessages]);


  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#010205] z-50"
      style={{
        backgroundImage: `radial-gradient(circle at top, rgba(255,255,255,0.1) 0%, transparent 30%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Star background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => {
          const size = Math.random() * 2 + 1;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.3,
              }}
            />
          );
        })}
      </div>

      {/* Rocket */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          transform: `translateY(${offsetY}px) scale(${scale})`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div style={{ transform: 'rotate(-48deg)', perspective: '500px' }} className="shadow-xl drop-shadow-[0_4px_10px_rgba(0,255,255,0.2)]">
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

        {/* Flame */}
        <div className="flex gap-1 mt-2" style={{ transform: 'translateX(-4px)' }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="relative h-12 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
              <div
                className="absolute w-2 bg-gradient-to-t from-transparent to-cyan-400 blur-sm opacity-70"
                style={{
                  height: `${16 + Math.random() * 16}px`,
                  borderRadius: '0 0 12px 12px',
                  animation: 'flicker 0.5s ease-in-out infinite alternate',
                }}
              ></div>
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

      {/* Loading Message */}
      {/* Bottom-fixed Loading Message */}
<motion.div
  key={messageIndex}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 0.85, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="absolute bottom-8 w-full p-2 text-white text-sm text-center font-poppins-normal"
>
  {displayedText || ""}
</motion.div>


    </div>
  );
};

export default Spinner;
