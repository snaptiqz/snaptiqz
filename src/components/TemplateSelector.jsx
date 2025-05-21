import React from 'react';
import { QrCodeIcon } from 'lucide-react';

const TemplateSelector = ({ selectedTemplate, setTemplate, color, showWatermark }) => {
  const templates = [
    { id: 'template1', label: 'With Cutout' },
    { id: 'template2', label: 'Solid Bottom' },
    { id: 'template3', label: 'Normal Div' },
    { id: 'template4', label: 'Full Black' }
  ];

  return (
     <div className='mt-8'>
  <p className='text-sm'>Choose Template</p>

  <div className="bg-[#2b2b2b] w-full h-[200px] rounded-lg mt-2 p-2 mr-4 overflow-x-auto overflow-y-hidden">
    <div className='flex gap-8'>

      {/* Template 1 — With Bottom Circle (SVG) */}
    <div
  className={`w-[100px] h-[190px] flex-shrink-0 rounded-xl transition ${
    selectedTemplate === 'template1' ? 'shadow-[0_0_12px_rgba(255,255,255,0.5)]' : ''
  }`}
  onClick={() => setTemplate('template1')}
>



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
      <div
  className={`w-[100px] h-[190px] flex-shrink-0 rounded-xl cursor-pointer transition  ${
    selectedTemplate === 'template2' ? 'shadow-[0_0_12px_rgba(255,255,255,0.5)]' : ''
  }`}
  onClick={() => setTemplate('template2')}
>
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
    <div
  className={`w-[91px] h-[140px] flex-shrink-0 mt-10 rounded-xl cursor-pointer transition ${
    selectedTemplate === 'template3' ? 'shadow-[0_0_12px_rgba(255,255,255,0.6)]' : ''
  }`}
  onClick={() => setTemplate('template3')}
>


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
     <div
  className={`w-[100px] h-[720px]  flex-shrink-0 rounded-xl cursor-pointer transition ring-offset-2 ${
    selectedTemplate === 'template4' ? 'shadow-[0_0_12px_rgba(255,255,255,0.5)]' : ''
  }`}
  onClick={() => setTemplate('template4')}
>

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
  );
};

export default TemplateSelector;
