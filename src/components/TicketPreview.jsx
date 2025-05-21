// File: components/TicketPreview.jsx
import React from 'react';
import { Clock, MapPin, Calendar, QrCodeIcon } from 'lucide-react';
import avatar from '../assets/avatar.svg';

const TicketPreview = ({
  template,
  ticketImage,
  textAlign = 'center',
  fontFamily,
  color = '#000',
   textColor = '#fff',
  showWatermark,
  visibility = {},
}) => {
  if (!['template1', 'template2', 'template3', 'template4'].includes(template)) return null;

  const detailInfo = (
    <>
      <div className={`flex gap-3 justify-${textAlign} text-sm`}>
        <Clock size={template === 'template3' ? 18 : 20} />
        <p>6:00 PM - 8:00 PM</p>
      </div>
      <div className={`flex gap-3 justify-${textAlign} text-sm`}>
        <Calendar size={template === 'template3' ? 16 : 20} />
        <p>21 May 2025</p>
      </div>
      <div className={`flex gap-3 justify-${textAlign} text-sm`}>
        <MapPin size={template === 'template3' ? 16 : 20} />
        <p>To be announced</p>
      </div>
    </>
  );

  const blackSection = (
    <div className="absolute inset-0 z-20 flex justify-between px-4 py-3 mt-2 text-white">
      <div className="flex flex-col justify-start mt-2 gap-1">
        <p className="mb-10 text-sm">Name</p>
        <p className="text-white/80 text-sm">Invite-code</p>
        <p className="text-white text-md">SN-24Xc1</p>
        {showWatermark && (
          <div className="opacity-30 text-xs flex items-center">
            <p>Snaptiqz</p>
          </div>
        )}
      </div>
      <div className="mt-4 text-white/80">
        <QrCodeIcon size={template === 'template3' ? 80 : 120} />
      </div>
    </div>
  );

  return (
    <div className="bg-[#2b2b2b] h-[700px] p-4 w-full  rounded-lg">
      <div className="flex flex-col w-full">
        {/* White Top Section for template1/2/3 */}
        {(template === 'template1' || template === 'template2' || template === 'template3') && (
          <div
            className={`bg-white w-full text-black ${
              template === 'template3' ? 'h-[300px] rounded-t-xl' : 'h-[450px] rounded-xl'
            } flex flex-col ${visibility.ticketOnly ? 'hidden' : 'block'}`}
            
          >
            <img
              src={ticketImage}
              alt="Ticket design"
              className="w-full object-fill"
              style={{
                height: template === 'template3' ? '60px' : '25%',
              }}
            />

            <div
              className={`flex flex-col items-${textAlign} ${
                template === 'template3' ? 'mt-2 gap-1 px-3' : 'mt-4 gap-2 px-4'
              }`}
            >
              {visibility.showEventName && (
                <h2
                  className={`${template === 'template3' ? 'text-lg' : 'text-2xl'} font-semibold`}
                  style={{ fontFamily }}
                >
                  Event Name
                </h2>
              )}

              {visibility.showOrganizerImage && (
                <div className={`flex justify-${textAlign} w-full`}>
                  <img
                    src={avatar}
                    className={`border border-black rounded-full ${
                      template === 'template3' ? 'h-16 w-16' : 'h-20 w-20'
                    }`}
                    alt="Organizer"
                  />
                </div>
              )}

              {visibility.showOrganizerName && (
                <p className="font-semibold text-sm" style={{ fontFamily }}>
                  Hosted by Organizer Name
                </p>
              )}

              {visibility.showDetails && detailInfo}
            </div>
          </div>
        )}

        {/* Template 1 SVG with circular cutout */}
        {template === 'template1' && (
          <div className="flex flex-col justify-center relative w-full">
            <svg
              viewBox="0 0 400 280"
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
              <rect width="100%" height="240" fill={color} rx="24" ry="24" mask="url(#cutout)" />
            </svg>
            {blackSection}
          </div>
        )}

        {/* Template 2 - Black rounded container without SVG */}
        {template === 'template2' && (
          <div className="flex flex-col justify-center relative w-full">
            <div className="w-full h-[200px] rounded-2xl relative z-10" style={{ backgroundColor: color }}>
              {blackSection}
            </div>
          </div>
        )}

        {/* Template 3 - Reduced height overall */}
        {template === 'template3' && (
          <div className="flex flex-col justify-center relative w-full">
            <div className="w-full h-[180px] bg-black rounded-b-xl relative z-10" style={{ backgroundColor: color }}>
              {blackSection}
            </div>
          </div>
        )}

        {/* Template 4 - Black outer container with both white and black sections inside */}
        {template === 'template4' && (
          <div className="rounded-2xl p-3 w-full" style={{ backgroundColor: color }}>
            <div
              className={`bg-white rounded-xl w-full h-[400px] flex flex-col ${
                visibility.ticketOnly ? 'hidden' : 'block'
              }`}
              style={{ color }}
            >
              <img
                src={ticketImage}
                alt="Ticket design"
                className="w-full h-1/4 object-fill"
                style={{ height: '25%' }}
              />

              <div className={`flex flex-col items-${textAlign} mt-4 gap-2 px-4`}>
                {visibility.showEventName && (
                  <h2 className="text-2xl font-semibold" style={{ fontFamily }}>
                    Event Name
                  </h2>
                )}
                {visibility.showOrganizerImage && (
                  <div className="flex justify-center w-full">
                    <img
                      src={avatar}
                      className="h-20 w-20 border border-black rounded-full"
                      alt="Organizer"
                    />
                  </div>
                )}
                {visibility.showOrganizerName && (
                  <p className="font-semibold" style={{ fontFamily }}>
                    Hosted by Organizer Name
                  </p>
                )}
                {visibility.showDetails && detailInfo}
              </div>
            </div>

            <div className="w-full h-[200px] bg-black rounded-2xl relative z-10 mt-4" style={{ backgroundColor: color }}>
              {blackSection}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketPreview;
