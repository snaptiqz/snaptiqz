import React, { useRef, useState } from 'react';
import { Upload, ImageIcon, Layout, Palette, Undo, Eye,ArrowLeft, Clock, MapPin,Calendar, QrCodeIcon,ImageOff, AlignLeft, AlignCenter, AlignRight, ChevronsLeftRight, Sparkle, Sparkles } from 'lucide-react';
import defaultTicket from '../assets/ticketdesign1.png';
import TopNavbar from '../components/TopNavbar';
import StarryBackground from '../components/StarryBackground';
import avatar from '../assets/avatar.svg';


const TicketDesigner = () => {
  const fileInputRef = useRef(null);

  const [ticketImage, setTicketImage] = useState(null);
  const [color, setColor] = useState('#000000');
  const [template, setTemplate] = useState('template1');
  const [visibility, setVisibility] = useState({
    showEventName: true,
    showDetails: true,
    showOrganizerImage: true,
    showOrganizerName: true,
    ticketOnly: false,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setTicketImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => setTicketImage(null);

  const handleColorChange = (newColor) => setColor(newColor);

  const handleToggle = (key) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUndo = () => {
    setTicketImage(null);
    setColor('#000000');
    setTemplate('template1');
    setVisibility({
      showEventName: true,
      showDetails: true,
      showOrganizerImage: true,
      showOrganizerName: true,
      ticketOnly: false,
    });
  };

  const VisibilityToggle = ({ label, value, onToggle }) => (
  <button
    onClick={onToggle}
    className={`flex justify-between items-center px-4 py-2 rounded-md min-w-[250px] ${
      value ? 'bg-[#2b2b2b]' : 'bg-[#1e1e1e]'
    }`}
  >
    <span>{label}</span>
    <div className="w-5 h-5 border border-white rounded-full flex items-center justify-center">
      {value && <div className="w-3 h-3 bg-white rounded-full" />}
    </div>
  </button>
);

const toggleShowEventName = () =>
  setVisibility((prev) => ({ ...prev, showEventName: !prev.showEventName }));
const toggleShowDetails = () =>
  setVisibility((prev) => ({ ...prev, showDetails: !prev.showDetails }));
const toggleShowOrganizerImage = () =>
  setVisibility((prev) => ({ ...prev, showOrganizerImage: !prev.showOrganizerImage }));
const toggleShowOrganizerName = () =>
  setVisibility((prev) => ({ ...prev, showOrganizerName: !prev.showOrganizerName }));
const toggleTicketOnly = () =>
  setVisibility((prev) => ({ ...prev, ticketOnly: !prev.ticketOnly }));


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

      {/* content starting here */}
     <div className='p-4 mt-10 mb-20'>
    <div className='flex justify-start gap-3 mb-6'>
        <div className='flex gap-2'>
                <button onClick={() => navigate(-1)}>
            <ArrowLeft className="text-white bg-[#2b2b2b] p-1 rounded-lg" size={28} />
          </button>
        </div>
          <h2 className="text-xl ">Edit Tickets</h2>
    </div>

    <div className='bg-[#2b2b2b] p-4 h-[700px] w-full rounded-lg'>
        <div className='flex flex-col'>
            <div className='bg-white rounded-xl  w-full h-[450px] flex flex-col text-black'>
                <img src={defaultTicket}/>
                <div className='flex flex-col items-center mt-4 gap-3'>
                    <h2 className='text-2xl text-black font-semibold'>Event Name</h2>
                    <img src={avatar} className='h-20 w-20 border border-black rounded-full'/>
                    <p className='text-black font-semibold'>Hosted by Organizer Name</p>
                    <div className='flex gap-3'>
                        <Clock className='text-black' size={20}/>
                        <p>6:00 PM-8:00 PM</p>
                    </div>
                    <div className='flex gap-3'>
                        <Calendar className='text-black' size={20}/>
                        <p>21 May 2025</p>
                    </div>
                    <div className='flex gap-3'>
                        <MapPin className='text-black' size={20}/>
                        <p>To be announced</p>
                    </div>
                   

                </div>
               

            </div>
        <div className="flex flex-col justify-center relative w-full ">
 <svg
  viewBox="0 0 400 240"
  width="100%"
  height="240"
  className="rounded-xl z-10 -mt-5"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <mask id="cutout">
      <rect width="100%" height="100%" rx="12" ry="12" fill="white" />
      <circle cx="200" cy="240" r="40" fill="black" />
    </mask>
  </defs>

  <rect
    width="100%"
    height="280"
    fill="black"
    rx="24"
    ry="24"
    mask="url(#cutout)"
  />
</svg>


  {/* Content over SVG */}
  <div className="absolute inset-0 z-20 flex justify-between px-4 py-4">
    <div className="flex flex-col justify-start mt-2 gap-2 text-white">
      <p className="mb-10">Name</p>
      <p className="text-white/80 text-lg">Invite-code</p>
      <p className="text-white text-xl">SN-24Xc1</p>
    </div>
    <div className="mt-4 text-white/80">
      <QrCodeIcon size={120} />
    </div>
  </div>
</div>


              



        </div>
        

    </div>

         <div className='mt-4 flex justify-between'>
                    
                        <button className='bg-[#1e1e1e] text-white px-3 flex py-2 rounded-lg gap-2'>Change Image
                            <ImageIcon className='text-white' size={20}/>
                        </button>
                  
                          <button className='bg-[#1e1e1e] text-white px-3 flex py-2 rounded-lg gap-2'>Remove Image
                            <ImageOff className='text-white' size={20}/>
                        </button>
                    

                    </div>

                      <div className='mt-4 flex justify-between'>
                    
                       <div className='flex flex-col  gap-2'>
                         <p className='text-xs text-white/80'> Align</p>
                         <div className='flex  gap-2'>
                            <button className='bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-3 flex py-2 rounded-lg gap-2'><AlignLeft className='text-white' size={20}/> 
                            </button>
                            <button className='bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-3 flex py-2 rounded-lg gap-2'><AlignCenter className='text-white' size={20}/> 
                            </button>
                            <button className='bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-3 flex py-2 rounded-lg gap-2'><AlignRight className='text-white' size={20}/>
                            </button>
                       </div>
                         </div>
                         <button className='bg-[#1e1e1e] text-white px-3 flex py-2 rounded-lg gap-2 mt-4'>
                            <p>Ag</p>
                            <p>Font Name</p>
                            <ChevronsLeftRight size={20} angle={180} />
                             </button>

                       </div>


                       {/* Select Color */}
                       <div className='mt-6'>
  <p className='text-sm text-white/70 mb-2'>Select color</p>
  <div className='flex items-center gap-3 flex-wrap'>
    {[
      '#000000', // black
      '#b42020', // red
      '#f5c518', // yellow
      '#0e1a4b', // dark blue
      '#d3d3d3', '#d3d3d3', '#d3d3d3', '#d3d3d3', '#d3d3d3' // gray placeholders
    ].map((clr, index) => (
      <button
        key={index}
        className={`w-6 h-6 rounded-full border-2 ${color === clr ? 'border-white' : 'border-transparent'}`}
        style={{ backgroundColor: clr }}
       
      />
    ))}
  </div>
</div>

<div className="mt-6 space-y-4 flex flex-col">
  <h3 className="text-white font-semibold">Visibility</h3>

  <div className="flex flex-col gap-2 items-start ">
    <VisibilityToggle label="Show event name" value={visibility.showEventName} onToggle={() => toggleShowEventName()} />
    <VisibilityToggle label="Show event Details" value={visibility.showDetails} onToggle={() => toggleShowDetails()} />
    <VisibilityToggle label="Show organizer image" value={visibility.showOrganizerImage} onToggle={() => toggleShowOrganizerImage()} />
    <VisibilityToggle label="Show organizer name" value={visibility.showOrganizerName} onToggle={() => toggleShowOrganizerName()} />
    <VisibilityToggle label="Ticket Only" value={visibility.ticketOnly} onToggle={() => toggleTicketOnly()} />
  </div>

   </div> 
   <button className=" gap-2 bg-[#1e1e1e] text-white px-2 py-2 rounded-md mt-4 flex">
    Remove Watermark
    <span className="text-xs"><Sparkles size={20} /></span>
  </button>

  <div className="flex gap-2 mt-4">
    
    <button className="bg-white text-black px-4 py-2 rounded-md font-semibold">Update</button>
    <button onClick={handleUndo} className="bg-[#1e1e1e] text-white px-4 py-2 rounded-md font-semibold">Undo Changes</button>

</div>



                      
                    

                   
      
      </div> 
    </div>
  );
};

export default TicketDesigner;