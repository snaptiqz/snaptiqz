import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { UsersRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScanGuestPage = () => {
  const qrCodeRegionId = 'qr-reader';
  const html5QrCodeRef = useRef(null);
  const scannerStartedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const qrCodeScanner = new Html5Qrcode(qrCodeRegionId);
    html5QrCodeRef.current = qrCodeScanner;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    };

    qrCodeScanner
      .start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          if (scannerStartedRef.current) {
            console.log('Scanned:', decodedText);
            scannerStartedRef.current = false;
            qrCodeScanner.stop().then(() => qrCodeScanner.clear());
            // Navigate or do something with decodedText
          }
        },
        (errorMsg) => {
          // Optional: console.warn('QR scan error:', errorMsg);
        }
      )
      .then(() => {
        scannerStartedRef.current = true;
      })
      .catch((err) => {
        console.error('Unable to start scanning:', err);
      });

    return () => {
      if (scannerStartedRef.current) {
        qrCodeScanner.stop().then(() => qrCodeScanner.clear());
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-center items-center text-white px-4"
      style={{
  background: `
    radial-gradient(circle at top,
      
      #020308 30%,
      #0F1015 70%,
      #1E1E1E 100%
    )
  `,
  backdropFilter: 'blur(6px)'
}}

    >
      <div
        id={qrCodeRegionId}
        className="w-full max-w-xs aspect-square rounded-lg bg-[#010205] overflow-hidden"
      />

      <p className="my-3 text-white/50 text-sm">or</p>

      <button
        onClick={() => console.log('Manual invite')}
        className="bg-white text-black text-sm px-4 py-2 rounded-md mb-2"
      >
        Use Invite Code
      </button>

      <button
        onClick={() => navigate(-1)}
        className="bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2 mt-10"
      >
        Back to Guests <UsersRound size={16} />
      </button>
    </div>
  );
};

export default ScanGuestPage;
