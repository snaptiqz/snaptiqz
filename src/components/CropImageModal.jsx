import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

const CropImageModal = ({ imageSrc, onCancel, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropDone(croppedImageUrl);
    } catch (e) {
      console.error('Crop failed', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="relative w-[90vw] h-[60vh] bg-white rounded-md overflow-hidden flex flex-col">
        <div className="relative flex-1">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={16 / 5.6}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="flex justify-end gap-2 px-4 py-3 border-t">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleDone} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropImageModal;
