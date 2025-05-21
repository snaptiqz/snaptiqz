import React, { useRef, useState, useCallback } from 'react';
import { Upload, ImageIcon, Layout, Palette, Undo, Eye, ArrowLeft, Clock, MapPin, Calendar, QrCodeIcon, ImageOff, AlignLeft, AlignCenter, AlignRight, ChevronsLeftRight, Sparkle, Sparkles, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import defaultTicket from '../assets/ticketdesign1.png';
import TopNavbar from '../components/TopNavbar';
import StarryBackground from '../components/StarryBackground';
import avatar from '../assets/avatar.svg';
import TemplateSelector from '../components/TemplateSelector';
import TicketPreview from '../components/TicketPreview';


const TicketDesigner = () => {
  const fileInputRef = useRef(null);
  const navigate = () => console.log("Navigate function would be called here");

  const [ticketImage, setTicketImage] = useState(defaultTicket);
  const [color, setColor] = useState('#000000');
  const [template, setTemplate] = useState('template1');
  const [textAlign, setTextAlign] = useState('center');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [textColor, setTextColor] = useState('#ffffff');
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

        <TicketPreview
  template={template}
  ticketImage={ticketImage}
  textAlign={textAlign}
  fontFamily={fontFamily}
  color={color}
  textColor={textColor}    
  showWatermark={showWatermark}
  visibility={visibility}
/>


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
  <div className='flex gap-3 overflow-x-auto whitespace-nowrap pb-2'>
    {[
      '#000000', '#1c1c1c', '#b42020', '#ff4d4d',
      '#f5c518', '#ffd700', '#ffa500', '#ff8c00',
      '#0e1a4b', '#2b5797', '#5dade2', '#1b5e20',
      '#4caf50', '#81c784', '#6a1b9a', '#ba68c8',
      '#5d4037', '#8d6e63', '#d3d3d3', '#9e9e9e',
      '#f06292', '#e91e63'
    ].map((clr, index) => (
      <button
        key={index}
        className={`min-w-[24px] min-h-[24px] rounded-full border-2 hover:scale-110 transition-transform ${
          color === clr ? 'border-white' : 'border-transparent'
        }`}
        style={{ backgroundColor: clr }}
        onClick={() => handleColorChange(clr)}
      />
    ))}
  </div>
</div>

{/* <div className='mt-6'>
  <p className='text-sm text-white/70 mb-2'>Text color</p>
  <div className='flex gap-3 overflow-x-auto whitespace-nowrap pb-2'>
    {[
      '#ffffff', '#e4e4e4', '#cccccc', '#999999', '#666666', '#333333',
      '#000000', '#ff4d4d', '#ffd700', '#81c784', '#5dade2', '#ba68c8'
    ].map((clr, index) => (
      <button
        key={index}
        className={`min-w-[24px] min-h-[24px] rounded-full border-2 hover:scale-110 transition-transform ${
          textColor === clr ? 'border-white' : 'border-transparent'
        }`}
        style={{ backgroundColor: clr }}
        onClick={() => setTextColor(clr)}
      />
    ))}
  </div>
</div> */}



     
<TemplateSelector 
  selectedTemplate={template} 
  setTemplate={setTemplate} 
  
  showWatermark={showWatermark} 
/>



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