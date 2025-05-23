import React, { useRef, useState, useCallback,useEffect } from 'react';
import { Upload, ImageIcon, Layout, Palette, Undo, Eye, ArrowLeft, Clock, MapPin, Calendar, QrCodeIcon,Download, ImageOff, AlignLeft, AlignCenter, AlignRight, ChevronsLeftRight, Sparkle, Sparkles, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import defaultTicket from '../assets/ticketdesign1.png';
import TopNavbar from '../components/TopNavbar';
import StarryBackground from '../components/StarryBackground';
import avatar from '../assets/avatar.svg';
import TemplateSelector from '../components/TemplateSelector';
import TicketPreview from '../components/TicketPreview';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import CropImageModal from '../components/CropImageModal'; 


const TicketDesigner = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const ticketRef = useRef(null);
  const [ticketImage, setTicketImage] = useState(defaultTicket);
  const [color, setColor] = useState('#000000');
  const [bodyColor, setBodyColor] = useState('#FFFFFF');
  const [textColor2,setTextColor2] = useState('#000000');
  const [template, setTemplate] = useState('template1');
  const [textAlign, setTextAlign] = useState('center');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState(16); // default 16px
  const [cropSrc, setCropSrc] = useState(null);
const [showCropper, setShowCropper] = useState(false);
  const [inputColor, setInputColor] = useState(color);
   const [inputBodyColor, setInputBodyColor] = useState(bodyColor);
  const [inputTextColor2, setInputTextColor2] = useState(textColor2);
  const [showWatermark, setShowWatermark] = useState(true);
  const [visibility, setVisibility] = useState({
    showCoverImage: true,
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
    const reader = new FileReader();
    reader.onloadend = () => {
      setCropSrc(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  }
}, []);


  const handleRemoveImage = useCallback(() => {
    setTicketImage(defaultTicket);
  }, []);

  const handleColorChange = useCallback((newColor) => {
    setColor(newColor);
  }, []);

   const handleBodyColorChange = useCallback((newColor) => {
    setBodyColor(newColor);
  }, []);


  const handleTextColorChange = useCallback((newColor) => {
  setTextColor2(newColor);
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
    setTextColor2('#000000');
    setBodyColor('#FFFFFF');
    setTemplate('template1');
    setTextAlign('center');
    setFontFamily('Inter');
    setShowWatermark(true);
    setVisibility({
      showCoverImage: true,
      showDetails: true,
      showOrganizerImage: true,
      showOrganizerName: true,
      ticketOnly: false,
    });
  }, []);

  const handleRemoveWatermark = useCallback(() => {
    setShowWatermark(false);
  }, []);

const handleDownload = async () => {
  if (!ticketRef.current) return;

  const originalBg = ticketRef.current.style.backgroundColor;
  ticketRef.current.style.backgroundColor = 'transparent'; // ensure no background

  const canvas = await html2canvas(ticketRef.current, {
    backgroundColor: null, // ⬅️ this removes white fallback background
  });

  ticketRef.current.style.backgroundColor = originalBg; // restore if needed

  const link = document.createElement('a');
  link.download = 'ticket.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
};



useEffect(() => {
  setInputColor(color); // sync when color changes elsewhere
}, [color]);

useEffect(()=>{
  setInputTextColor2(textColor2);
},[textColor2])

useEffect(()=>{
  setInputBodyColor(bodyColor);
},[bodyColor  ])

  const handleUpdate = useCallback(() => {
    
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

  const toggleShowCoverImage = useCallback(() => 
    setVisibility((prev) => ({ ...prev, showCoverImage: !prev.showCoverImage })), []);
    
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

        <div className='bg-[#2b2b2b] rounded-lg h-[700px] p-4 sm:w-[350px]    ' ref={ticketRef}>
  <TicketPreview
    template={template}
    ticketImage={ticketImage}
    textAlign={textAlign}
    fontFamily={fontFamily}
    color={color}
    bodyColor={bodyColor}
    textColor2={textColor2}
    showWatermark={showWatermark}
    visibility={visibility}
     fontSize={fontSize}
   
  
  />
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
          <button
  onClick={handleDownload}
  className="bg-[#1e1e1e] text-white p-1  rounded-md  hover:bg-gray-600"
>
 <Download className='text-white' size={20} />
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
  className={`px-3 py-2 rounded-lg gap-2 mt-4 flex items-center justify-between w-32 ${
    fontFamily !== 'Inter' ? 'bg-[#4b4b4b]' : 'bg-[#1e1e1e]'
  } hover:bg-[#4b4b4b] text-white`}
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
        {/* <div className="mt-4">
  <p className="text-sm text-white/70 mb-2">Font Size</p>
  <input
    type="range"
    min={10}
    max={30}
    step={1}
    value={fontSize}
    onChange={(e) => setFontSize(parseInt(e.target.value))}
    className="w-full"
  />
  <p className="text-xs text-white mt-1">Size: {fontSize}px</p>
</div> */}


        {/* Select Color */}
      <div className='mt-6 flex justify-between'>
   <div className="">
  <p className="text-sm text-white/70 mb-2">Select Ticket Color</p>
  <div className="flex items-center gap-4 relative">
    {/* Hidden native input */}
    <input
      type="color"
      value={color}
      onChange={(e) => {
        const value = e.target.value;
        setInputColor(value);
        handleColorChange(value);
      }}
      className="absolute w-0 h-0 opacity-0"
      id="ticket-color-picker"
    />

    {/* Custom color swatch */}
    <label
      htmlFor="ticket-color-picker"
      className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
      style={{ backgroundColor: color }}
    ></label>

    {/* Hex input */}
    <input
      type="text"
      value={inputColor}
      onChange={(e) => setInputColor(e.target.value)}
      onBlur={() => {
        if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(inputColor)) {
          handleColorChange(inputColor);
        } else {
          setInputColor(color); // revert if invalid
        }
      }}
      maxLength={7}
      placeholder="#000000"
      className="bg-[#1e1e1e] border border-white/20 rounded-md px-3 py-1 text-white text-sm w-[100px]"
    />
  </div>
</div>


<div className="">
  <p className="text-sm text-white/70 mb-2">Select Body Color</p>
  <div className="flex items-center gap-4 relative">
    {/* Hidden native input */}
    <input
      type="color"
      value={bodyColor}
      onChange={(e) => {
        const value = e.target.value;
        setInputBodyColor(value);
        handleBodyColorChange(value);
      }}
      className="absolute w-0 h-0 opacity-0"
      id="body-color-picker"
    />

    {/* Custom color swatch */}
    <label
      htmlFor="body-color-picker"
      className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
      style={{ backgroundColor: bodyColor }}
    ></label>

    {/* Hex code input */}
    <input
      type="text"
      value={inputBodyColor}
      onChange={(e) => setInputBodyColor(e.target.value)}
      onBlur={() => {
        if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(inputBodyColor)) {
          handleBodyColorChange(inputBodyColor);
        } else {
          setInputBodyColor(bodyColor); // revert if invalid
        }
      }}
      maxLength={7}
      placeholder="#ffffff"
      className="bg-[#1e1e1e] border border-white/20 rounded-md px-3 py-1 text-white text-sm w-[100px]"
    />
  </div>
</div>

</div>


<div className="">
  <p className="text-sm text-white/70 mb-2">Select Text Color</p>
  <div className="flex items-center gap-4 relative">
    {/* Hidden native color input */}
    <input
      type="color"
      value={textColor2}
      onChange={(e) => {
        const value = e.target.value;
        setInputTextColor2(value);
        handleTextColorChange(value);
      }}
      className="absolute w-0 h-0 opacity-0"
      id="text-color-picker"
    />

    {/* Custom swatch */}
    <label
      htmlFor="text-color-picker"
      className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
      style={{ backgroundColor: textColor2 }}
    ></label>

    {/* Hex input */}
    <input
      type="text"
      value={inputTextColor2}
      onChange={(e) => setInputTextColor2(e.target.value)}
      onBlur={() => {
        if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(inputTextColor2)) {
          handleTextColorChange(inputTextColor2);
        } else {
          setInputTextColor2(textColor2);
        }
      }}
      maxLength={7}
      placeholder="#ffffff"
      className="bg-[#1e1e1e] border border-white/20 rounded-md px-3 py-1 text-white text-sm w-[100px]"
    />
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
            <VisibilityToggle label="Show Cover Image" value={visibility.showCoverImage} onToggle={toggleShowCoverImage} />
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
      {showCropper && (
  <CropImageModal
    imageSrc={cropSrc}
    onCancel={() => setShowCropper(false)}
    onCropDone={(croppedUrl) => {
      setTicketImage(croppedUrl);
      setShowCropper(false);
    }}
  />
)}
    </div>
    
  );
};

export default TicketDesigner;