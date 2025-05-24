import React from 'react';
import {
  RefreshCcw,
  Image,
  Sparkles,
  ChevronsUpDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';

const EditPosterUploader = ({
  coverImage,
  setCoverImage,
  currentPoster,
  imageUrl,
  switchTemplate,
  fontFamily,
  setFontFamily,
  textAlign,
  handleAlignChange,
  eventName = 'Event Name',
  onPosterChange = () => {},
}) => {
  const getImageSrc = () => {
    if (coverImage) return URL.createObjectURL(coverImage);
    if (imageUrl) return imageUrl;
    return currentPoster;
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        onPosterChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fontList = [
    'Inter', 'Arial', 'Helvetica', 'Times New Roman', 'Roboto',
    'Open Sans', 'Poppins', 'Lato', 'Georgia', 'Courier New',
  ];

  const cycleFont = () => {
    const currentIndex = fontList.indexOf(fontFamily);
    const nextIndex = (currentIndex + 1) % fontList.length;
    setFontFamily(fontList[nextIndex]);
  };

  return (
    <div className="w-full bg-[#2b2b2b] border border-white/20 rounded-xl overflow-hidden">
      <div className="relative">
        <img
          src={getImageSrc()}
          alt="Event Poster"
          className="w-full h-40 object-cover"
        />

        {/* Buttons */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={switchTemplate}
            className="bg-white text-black px-2 py-1 text-xs rounded-md flex items-center gap-1"
          >
            <RefreshCcw size={14} />
          </button>

          <input
            type="file"
            accept="image/*"
            id="poster-upload"
            onChange={handleUpload}
            className="hidden"
          />
          <label
            htmlFor="poster-upload"
            className="bg-white text-black px-2 py-1 text-xs rounded-md flex items-center gap-1 cursor-pointer"
          >
            <Image size={14} /> Add your Event Poster
          </label>
        </div>

        {/* Overlay text */}
        <div
          className="absolute bottom-2 w-full px-4 z-10 text-white text-xl font-title"
          style={{ textAlign, fontFamily }}
        >
          {eventName}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-1 flex gap-2">
        {/* Font & Alignment Controls */}
        <div className="w-1/2">
          <div className="flex flex-col gap-1">
            <button
              className="px-3 py-2 rounded-lg gap-2 flex items-center justify-between w-32 bg-[#1e1e1e] hover:bg-[#4b4b4b] text-white"
              onClick={cycleFont}
            >
              <p className="text-base font-semibold">Ag</p>
              <p className="truncate text-sm max-w-[100px]">{fontFamily}</p>
              <ChevronsUpDown size={20} />
            </button>

            <p className="text-sm text-white p-2">Align event name</p>
            <div className="flex gap-2">
              {['left', 'center', 'right'].map((align) => {
                const Icon = align === 'left' ? AlignLeft : align === 'center' ? AlignCenter : AlignRight;
                return (
                  <button
                    key={align}
                    onClick={() => handleAlignChange(align)}
                    className={`px-2 py-2 rounded-lg flex items-center gap-2 ${
                      textAlign === align ? 'bg-[#4b4b4b]' : 'bg-[#1e1e1e]'
                    } hover:bg-[#4b4b4b] text-white`}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mini Theme Preview */}
        <div className="w-44 flex flex-col items-center p-1 relative h-40 bg-[#4b4b4b] rounded-lg">
          <div
            className="relative w-[170px] mt-2 h-[100px] ml-2 cursor-pointer"
            onClick={switchTemplate}
            title="Click to change theme"
          >
            <div className="absolute w-[150px] h-full bg-[#2c2c2c] rounded-md top-2 left-2 z-0 shadow-md" />
            <div className="absolute w-[150px] h-full bg-[#949494] rounded-md top-1 left-1 z-10 shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
            <div className="relative z-20">
              <img
                src={currentPoster}
                className="rounded-md h-[100px] w-[150px] object-cover"
                alt="Preview"
              />
            </div>
          </div>

          <div className="flex gap-2 text-sm text-white absolute bottom-2 left-2 right-2">
            <p>Try out more themes</p>
            <Sparkles size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPosterUploader;
