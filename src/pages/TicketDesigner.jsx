import React, { useRef, useState, useCallback } from 'react';
import { Upload, ImageIcon, Layout, Palette, Undo, Eye, ArrowLeft, Clock, MapPin, Calendar, QrCodeIcon, ImageOff, AlignLeft, AlignCenter, AlignRight, ChevronsLeftRight, Sparkle, Sparkles, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import defaultTicket from '../assets/ticketdesign1.png';
import TopNavbar from '../components/TopNavbar';
import StarryBackground from '../components/StarryBackground';
import avatar from '../assets/avatar.svg';

const TicketDesigner = () => {
  const fileInputRef = useRef(null);
  const navigate = () => console.log("Navigate function would be called here");

  const [ticketImage, setTicketImage] = useState(defaultTicket);
  const [color, setColor] = useState('#000000');
  const [template, setTemplate] = useState('template1');
  const [textAlign, setTextAlign] = useState('center');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [showWatermark, setShowWatermark] = useState(true);
  const [visibility, setVisibility] = useState({
    showEventName: true,
    showDetails: true,
    showOrganizerImage: true,
    showOrganizerName: true,
    ticketOnly: false,
  });

  const handleImageUpload = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const onFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setTicketImage(URL.createObjectURL(file));
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    setTicketImage(defaultTicket);
  }, []);

  const handleColorChange = useCallback((newColor) => {
    setColor(newColor);
  }, []);

  const handleAlignChange = useCallback((alignment) => {
    setTextAlign(alignment);
  }, []);

  const handleToggle = useCallback((key) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleUndo = useCallback(() => {
    setTicketImage(defaultTicket);
    setColor('#000000');
    setTemplate('template1');
    setTextAlign('center');
    setFontFamily('Inter');
    setShowWatermark(true);
    setVisibility({
      showEventName: true,
      showDetails: true,
      showOrganizerImage: true,
      showOrganizerName: true,
      ticketOnly: false,
    });
  }, []);

  const handleRemoveWatermark = useCallback(() => {
    setShowWatermark(false);
  }, []);

  const handleUpdate = useCallback(() => {
    // In a real app, this would save the changes to a database or API
    console.log('Ticket design updated!', {
      ticketImage,
      color,
      template,
      textAlign,
      fontFamily,
      visibility,
      showWatermark
    });
    alert('Ticket design updated successfully!');
  }, [ticketImage, color, template, textAlign, fontFamily, visibility, showWatermark]);

  const toggleShowEventName = useCallback(() => 
    setVisibility((prev) => ({ ...prev, showEventName: !prev.showEventName })), []);
    
  const toggleShowDetails = useCallback(() => 
    setVisibility((prev) => ({ ...prev, showDetails: !prev.showDetails })), []);
    
  const toggleShowOrganizerImage = useCallback(() => 
    setVisibility((prev) => ({ ...prev, showOrganizerImage: !prev.showOrganizerImage })), []);
    
  const toggleShowOrganizerName = useCallback(() => 
    setVisibility((prev) => ({ ...prev, showOrganizerName: !prev.showOrganizerName })), []);
    
  const toggleTicketOnly = useCallback(() => 
    setVisibility((prev) => ({ ...prev, ticketOnly: !prev.ticketOnly })), []);

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

  return (
    <div
      className="min-h-screen w-full text-white bg-[#010205] relative overflow-hidden p-4"
      style={{
        backgroundImage: `radial-gradient(circle at top, rgba(0, 70, 255, 0.1) 0%, transparent 20%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <TopNavbar />
      <StarryBackground count={60} />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* content starting here */}
      <div className=' mt-10 mb-20'>
        <div className='flex justify-start gap-3 mb-6'>
          <div className='flex gap-2'>
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="text-white bg-[#2b2b2b] p-1 rounded-lg" size={28} />
            </button>
          </div>
          <h2 className="text-xl">Edit Tickets</h2>
        </div>

        <div className='bg-[#2b2b2b] p-4  h-[700px] w-full rounded-lg'>
          <div className='flex  flex-col '>
            <div 
              className={`bg-white rounded-xl w-full h-[450px] flex flex-col ${visibility.ticketOnly ? 'hidden' : 'block'}`}
              style={{ color }}
            >
              <img src={ticketImage} alt="Ticket design" className="w-full h-1/4 object-contain" style={{ height: '25%' }} />

              
              <div className={`flex flex-col items-${textAlign} mt-4 gap-2 px-4`}>
                {visibility.showEventName && (
                  <h2 className='text-2xl font-semibold' style={{ fontFamily }}>Event Name</h2>
                )}
                
                {visibility.showOrganizerImage && (
                  <div className="flex justify-center w-full">
                    <img src={avatar} className='h-20 w-20 border border-black rounded-full' alt="Organizer" />
                  </div>
                )}
                
                {visibility.showOrganizerName && (
                  <p className='font-semibold' style={{ fontFamily }}>Hosted by Organizer Name</p>
                )}
                
                {visibility.showDetails && (
                  <>
                    <div className='flex gap-3 justify-center'>
                      <Clock size={20} />
                      <p>6:00 PM-8:00 PM</p>
                    </div>
                    <div className='flex gap-3 justify-center'>
                      <Calendar size={20} />
                      <p>21 May 2025</p>
                    </div>
                    <div className='flex gap-3 justify-center'>
                      <MapPin size={20} />
                      <p>To be announced</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex flex-col justify-center relative w-full ">
              <svg
                viewBox="0 0 400 280"
                width="100%"
                height="100%"
                className="rounded-xl z-10 "
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
                  height="240"
                  fill={color}
                  rx="24"
                  ry="24"
                  mask="url(#cutout)"
                />
              </svg>

              {/* Content over SVG */}
              <div className="absolute inset-0 z-20 flex justify-between px-4 py-3 mt-2">
                <div className="flex flex-col justify-start mt-2 gap-1 text-white">
                  <p className="mb-10">Name</p>
                  <p className="text-white/80 text-lg">Invite-code</p>
                  <p className="text-white text-xl">SN-24Xc1</p>
                  {showWatermark && (
                  <div className=" opacity-30 text-xs flex items-center">
                    <p>Snaptiqz</p>
                  </div>
                )}
                </div>
                <div className="mt-4 text-white/80">
                  <QrCodeIcon size={120} />
                </div>
                
              </div>
            </div>
          </div>
        </div>

        <div className='mt-4 flex justify-between'>
          <button 
            onClick={handleImageUpload}
            className='bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-3 flex py-2 rounded-lg gap-2'
          >
            Change Image
            <ImageIcon className='text-white' size={20} />
          </button>
          
          <button 
            onClick={handleRemoveImage}
            className='bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-3 flex py-2 rounded-lg gap-2'
          >
            Remove Image
            <ImageOff className='text-white' size={20} />
          </button>
        </div>

        <div className='mt-4 flex justify-between'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs text-white/80'>Align</p>
            <div className='flex gap-2'>
              <button 
                onClick={() => handleAlignChange('left')}
                className={`bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-3 flex py-2 rounded-lg gap-2 ${textAlign === 'left' ? 'bg-[#4b4b4b]' : ''}`}
              >
                <AlignLeft className='text-white' size={20} />
              </button>
              <button 
                onClick={() => handleAlignChange('center')}
                className={`bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-3 flex py-2 rounded-lg gap-2 ${textAlign === 'center' ? 'bg-[#4b4b4b]' : ''}`}
              >
                <AlignCenter className='text-white' size={20} />
              </button>
              <button 
                onClick={() => handleAlignChange('right')}
                className={`bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-3 flex py-2 rounded-lg gap-2 ${textAlign === 'right' ? 'bg-[#4b4b4b]' : ''}`}
              >
                <AlignRight className='text-white' size={20} />
              </button>
            </div>
          </div>
          
          <button 
  className='bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-3 py-2 rounded-lg gap-2 mt-4 flex items-center justify-between w-32' // fixed width
  onClick={() => {
    const fonts = [
      'Inter', 'Arial', 'Helvetica', 'Times New Roman', 'Roboto', 
      'Open Sans', 'Poppins', 'Lato', 'Georgia', 'Courier New'
    ];
    const currentIndex = fonts.indexOf(fontFamily);
    const nextIndex = (currentIndex + 1) % fonts.length;
    setFontFamily(fonts[nextIndex]);
  }}
>
  <p className='text-base font-semibold'>Ag</p>
  <p className='truncate text-sm max-w-[100px]'>{fontFamily}</p>
  <ChevronsUpDown size={20} />
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
              '#2b5797', // medium blue
              '#5d4037', // brown
              '#6a1b9a', // purple
              '#1b5e20', // green 
              '#d3d3d3', // gray
            ].map((clr, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-full border-2 hover:scale-110 transition-transform ${color === clr ? 'border-white' : 'border-transparent'}`}
                style={{ backgroundColor: clr }}
                onClick={() => handleColorChange(clr)}
              />
            ))}
          </div>
        </div>

      <div className='mt-8'>
  <p className='text-sm'>Choose Template</p>

  <div className="bg-[#1e1e1e] w-full h-[200px] rounded-lg mt-2 p-2 overflow-x-auto overflow-y-hidden">
    <div className='flex gap-2'>

      {/* Template 1 — With Bottom Circle (SVG) */}
      <div className="w-[110px] flex-shrink-0">
        <div className='transform scale-[0.25] origin-top-left'>
          <div className="bg-white rounded-3xl w-[400px] h-[500px] overflow-hidden"></div>
          <div className="flex flex-col justify-center relative w-[400px]">
            <svg
              viewBox="0 0 400 240"
              width="100%"
              height="100%"
              className="rounded-xl z-10"
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
                fill={color}
                rx="24"
                ry="24"
                mask="url(#cutout)"
              />
            </svg>
            <div className="absolute inset-0 z-20 flex justify-between px-4 py-2">
              <div className="flex flex-col justify-start mt-2 gap-2 text-white text-sm">
                <p className="mb-4">Name</p>
                <p className="text-white/80 text-sm mt-6">Invite-code</p>
                <p className="text-white text-xl">SN-24Xc1</p>
                {showWatermark && (
                  <div className="opacity-30 text-[10px] flex items-center">
                    <p>Snaptiqz</p>
                  </div>
                )}
              </div>
              <div className="mt-4 text-white/80">
                <QrCodeIcon size={140} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template 2 — With Solid Black SVG */}
      <div className="w-[110px] flex-shrink-0">
  <div className='transform scale-[0.25] origin-top-left'>
    
    {/* Top White Section */}
    <div className="bg-white rounded-t-3xl w-[400px] h-[500px] overflow-hidden"></div>
    
    {/* Bottom Black Section (Replaces SVG) */}
    <div className="relative w-[400px] h-[240px] bg-black rounded-b-3xl z-10">
      <div className="absolute inset-0 z-20 flex justify-between px-4 py-2">
        <div className="flex flex-col justify-start mt-2 gap-2 text-white text-sm">
          <p className="mb-4">Name</p>
          <p className="text-white/80 text-sm mt-6">Invite-code</p>
          <p className="text-white text-xl">SN-24Xc1</p>
          {showWatermark && (
            <div className="opacity-30 text-[10px] flex items-center">
              <p>Snaptiqz</p>
            </div>
          )}
        </div>
        <div className="mt-4 text-white/80">
          <QrCodeIcon size={140} />
        </div>
      </div>
    </div>

  </div>
</div>


      {/* Template 3 — With Normal Div Instead of SVG */}
      <div className="w-[95px] flex-shrink-0 mt-10">
        <div className='transform scale-[0.25] origin-top-left'>
          <div className="bg-white rounded-t-xl w-[350px] h-[300px] overflow-hidden"></div>
          <div className="relative w-[350px] h-[240px] bg-black rounded-b-xl z-10">
            <div className="absolute inset-0 z-20 flex justify-between px-4 py-2">
              <div className="flex flex-col justify-start mt-2 gap-2 text-white text-sm">
                <p className="mb-4">Name</p>
                <p className="text-white/80 text-sm mt-6">Invite-code</p>
                <p className="text-white text-xl">SN-24Xc1</p>
                {showWatermark && (
                  <div className="opacity-30 text-[10px] flex items-center">
                    <p>Snaptiqz</p>
                  </div>
                )}
              </div>
              <div className="mt-4 text-white/80">
                <QrCodeIcon size={140} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template 4 */}
     <div className="w-[110px] flex-shrink-0">
  <div className="transform scale-[0.25] origin-top-left">

    {/* Full Ticket Container */}
    <div className="w-[400px] h-[740px] bg-black rounded-3xl p-6 flex flex-col justify-between">

      {/* White Top Section */}
      <div className="bg-white rounded-xl w-full h-[480px] overflow-hidden"></div>

      {/* Bottom Content Section */}
      <div className="flex justify-between items-end text-white text-sm ">

        {/* Left Text */}
        <div className="flex flex-col gap-2">
          <p className="text-white/70 text-sm">Name</p>
          <p className="text-white/80 text-sm mt-1">Invite-code</p>
          <p className="text-white text-xl font-semibold">SN-24Xc1</p>
          {showWatermark && (
            <div className="opacity-30 text-[10px] mt-2">
              <p>Snaptiqz</p>
            </div>
          )}
        </div>

        {/* Right QR Code */}
        <div className="text-white/80">
          <QrCodeIcon size={140} />
        </div>

      </div>

    </div>
    
  </div>
</div>



      

    </div>
  </div>
</div>



        <div className="mt-6 space-y-4 flex flex-col">
          <h3 className="text-white font-semibold">Visibility</h3>

          <div className="flex flex-col gap-2 items-start">
            <VisibilityToggle label="Show event name" value={visibility.showEventName} onToggle={toggleShowEventName} />
            <VisibilityToggle label="Show event Details" value={visibility.showDetails} onToggle={toggleShowDetails} />
            <VisibilityToggle label="Show organizer image" value={visibility.showOrganizerImage} onToggle={toggleShowOrganizerImage} />
            <VisibilityToggle label="Show organizer name" value={visibility.showOrganizerName} onToggle={toggleShowOrganizerName} />
            <VisibilityToggle label="Ticket Only" value={visibility.ticketOnly} onToggle={toggleTicketOnly} />
          </div>
        </div> 
        
        <button 
          onClick={handleRemoveWatermark}
          className="gap-2 bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-2 py-2 rounded-md mt-4 flex"
        >
          Remove Watermark
          <span className="text-xs"><Sparkles size={20} /></span>
        </button>

        <div className="flex gap-2 mt-4">
          <button 
            onClick={handleUpdate}
            className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200"
          >
            Update
          </button>
          <button 
            onClick={handleUndo} 
            className="bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white px-4 py-2 rounded-md font-semibold"
          >
            Undo Changes
          </button>
        </div>
      </div> 
    </div>
  );
};

export default TicketDesigner;