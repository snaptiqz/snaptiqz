import React from 'react';
import { Upload, RefreshCcw } from 'lucide-react';

const PosterUploader = ({
  eventPosterPreview,
  fileInputRef,
  switchTemplate,
  handlePosterUpload,
  template
}) => {
  return (
    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/20 mb-8 group hover:border-white/40 transition">
      <img
        src={eventPosterPreview}
        alt="Event Poster"
        className="w-full h-full object-cover bg-black"
      />
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={switchTemplate}
          className="bg-white text-black px-3 py-1 text-xs rounded-md flex items-center gap-1 shadow"
        >
          <RefreshCcw size={14} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handlePosterUpload}
          className="hidden"
        />
        <button
          className="bg-white text-black px-3 py-1 text-xs rounded-md flex items-center gap-1 shadow"
          onClick={() => fileInputRef.current.click()}
        >
          <Upload size={14} /> Upload Poster
        </button>
      </div>
    </div>
  );
};

export default PosterUploader;
