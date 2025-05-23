// File: components/TicketPreview.jsx
import React, { useMemo } from 'react';
import { Clock, MapPin, Calendar, QrCodeIcon } from 'lucide-react';
import avatar from '../assets/avatar.svg';

const VALID_TEMPLATES = ['template1', 'template2', 'template3', 'template4'];

const TicketPreview = ({
  template,
  ticketImage,
  textAlign = 'center',
  fontFamily,
  color = '#000',
  bodyColor = '#fff', 
  textColor2 = '#000',
  showWatermark,
  visibility = {},
}) => {
  // Early return for invalid templates
  if (!VALID_TEMPLATES.includes(template)) return null;

  // Memoized calculations
  const justifyContent = useMemo(() => {
    const alignMap = {
      left: 'flex-start',
      right: 'flex-end',
      center: 'center'
    };
    return alignMap[textAlign] || 'center';
  }, [textAlign]);

  const contrastColor = useMemo(() => {
    const getContrastColor = (bgColor) => {
      const hex = bgColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 160 ? '#000' : '#fff';
    };
    return getContrastColor(color);
  }, [color]);

  const isTemplate3 = template === 'template3';
  const iconSize = isTemplate3 ? 16 : 20;
  const clockIconSize = isTemplate3 ? 18 : 20;
  const qrSize = isTemplate3 ? 80 : 120;

  // Common styles
  const baseDetailStyle = {
    justifyContent,
    fontFamily,
  };

  // Extracted detail info component
  const DetailInfo = useMemo(() => (
    <>
      <div className="flex gap-3 text-sm" style={baseDetailStyle}>
        <Clock size={clockIconSize} />
        <p style={{ fontFamily }}>6:00 PM - 8:00 PM</p>
      </div>
      <div className="flex gap-3 text-sm" style={baseDetailStyle}>
        <Calendar size={iconSize} />
        <p style={{ fontFamily }}>21 May 2025</p>
      </div>
      <div className="flex gap-3 text-sm" style={baseDetailStyle}>
        <MapPin size={iconSize} />
        <p style={{ fontFamily }}>To be announced</p>
      </div>
    </>
  ), [baseDetailStyle, clockIconSize, iconSize, fontFamily]);

  // Black section component
  const BlackSection = useMemo(() => (
    <div
      className="absolute inset-0 z-20 flex justify-between px-4 py-3 mt-2"
      style={{ fontFamily, color: contrastColor }}
    >
      <div className="flex flex-col justify-start gap-1">
        <p className="mb-10 text-xl" style={{ fontFamily, color: contrastColor }}>
          Name
        </p>
        <p className="text-sm" style={{ fontFamily, color: contrastColor + 'CC' }}>
          Invite-code
        </p>
        <p className="text-md" style={{ fontFamily, color: contrastColor }}>
          SN-24Xc1
        </p>

        {showWatermark && (
          <div className="opacity-30 text-xs flex items-center">
            <p style={{ fontFamily, color: contrastColor }}>Snaptiqz</p>
          </div>
        )}
      </div>

      <div className="mt-5" style={{ color: contrastColor + 'CC' }}>
        <QrCodeIcon size={qrSize} color={contrastColor} />
      </div>
    </div>
  ), [fontFamily, contrastColor, showWatermark, qrSize]);

  // White section content component
  const WhiteSectionContent = useMemo(() => (
    <div
      className={`flex flex-col flex-1 justify-center gap-2 px-4 ${
        isTemplate3 ? 'gap-1 px-3' : ''
      }`}
      style={{ textAlign, fontFamily, color: textColor2 }}
    >
      {visibility.showEventName && (
        <h2 className={`${isTemplate3 ? 'text-lg' : 'text-2xl'} font-semibold`}>
          Event Name
        </h2>
      )}

      {visibility.showOrganizerImage && (
        <div className="flex w-full" style={{ justifyContent }}>
          <img
            src={avatar}
            className={`border border-black rounded-full ${
              isTemplate3 ? 'h-16 w-16' : 'h-20 w-20'
            }`}
            alt="Organizer"
          />
        </div>
      )}

      {visibility.showOrganizerName && (
        <p className="font-semibold text-sm">Hosted by Organizer Name</p>
      )}

      {visibility.showDetails && DetailInfo}
    </div>
  ), [
    isTemplate3,
    textAlign,
    fontFamily,
    textColor2,
    visibility,
    justifyContent,
    DetailInfo
  ]);

  // Template-specific rendering functions
  const renderWhiteSection = () => {
    if (!['template1', 'template2', 'template3'].includes(template)) return null;

    const sectionClasses = `w-full flex flex-col ${
      isTemplate3 ? 'h-[300px] rounded-t-xl' : 'h-[450px] rounded-xl'
    } ${visibility.ticketOnly ? 'hidden' : 'block'}`;

    return (
      <div className={sectionClasses} style={{ backgroundColor: bodyColor }}>
        {visibility.showCoverImage && (
          <img
            src={ticketImage}
            alt="Ticket design"
            className="w-full h-auto object-cover rounded-t-xl"
            style={{
              height: isTemplate3 ? '30%' : '25%',
              objectPosition: 'top',
            }}
          />
        )}
        {WhiteSectionContent}
      </div>
    );
  };

  const renderTemplate1 = () => (
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
      {BlackSection}
    </div>
  );

  const renderTemplate2 = () => (
    <div className="flex flex-col justify-center relative w-full">
      <div 
        className="w-full h-[200px] rounded-2xl relative z-10" 
        style={{ backgroundColor: color, fontFamily }}
      >
        {BlackSection}
      </div>
    </div>
  );

  const renderTemplate3 = () => (
    <div className="flex flex-col justify-center relative w-full">
      <div 
        className="w-full h-[180px] rounded-b-xl relative z-10" 
        style={{ backgroundColor: color, fontFamily }}
      >
        {BlackSection}
      </div>
    </div>
  );

  const renderTemplate4 = () => (
    <div className="rounded-2xl p-3 w-full" style={{ backgroundColor: color, fontFamily }}>
      <div
        className={`rounded-xl w-full h-[400px] flex flex-col ${
          visibility.ticketOnly ? 'hidden' : ''
        }`}
        style={{ backgroundColor: bodyColor, color: textColor2 }}
      >
        {visibility.showCoverImage && (
          <img
            src={ticketImage}
            alt="Ticket design"
            className="w-full object-cover rounded-t-xl"
            style={{
              height: '25%',
              objectPosition: 'top',
            }}
          />
        )}
        {WhiteSectionContent}
      </div>

      <div
        className="w-full h-[200px] rounded-2xl relative z-10 mt-4"
        style={{ backgroundColor: color, fontFamily }}
      >
        {BlackSection}
      </div>
    </div>
  );

  const templateRenderers = {
    template1: renderTemplate1,
    template2: renderTemplate2,
    template3: renderTemplate3,
    template4: renderTemplate4,
  };

  return (
    <div style={{ fontFamily }}>
      <div className="flex flex-col w-[320px]">
        {renderWhiteSection()}
        {templateRenderers[template]?.()}
      </div>
    </div>
  );
};

export default TicketPreview;