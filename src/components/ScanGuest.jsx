import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { UsersRound } from 'lucide-react';

const ScanGuest = ({ onBack, onManualEntry, onScan }) => {
  const qrCodeRegionId = 'qr-reader';
  const html5QrCodeRef = useRef(null);
  const scannerStartedRef = useRef(false); // ✅ track scanner status

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
            onScan?.(decodedText);
            scannerStartedRef.current = false;
            qrCodeScanner.stop().then(() => qrCodeScanner.clear());
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
      // ✅ only stop if it started
      if (scannerStartedRef.current) {
        qrCodeScanner.stop().then(() => qrCodeScanner.clear());
      }
    };
  }, []);

  return (
  <div
    className="h-full  shadow-lg p-2 flex flex-col items-center text-white w-full max-w-xs backdrop-blur-md"
    style={{
      background: `radial-gradient(circle at top, rgba(255,255,255,0.1) 0%, #020308 50%, #0F1015 100%)`
    }}
  >
    <div id={qrCodeRegionId} className="w-full aspect-square rounded-lg bg-black overflow-hidden" />

    <p className="my-3 text-white/50 text-sm">or</p>

    <button
      onClick={onManualEntry}
      className="bg-white text-black text-sm px-4 py-2 rounded-md mb-2"
    >
      Use Invite Code
    </button>

    <button
      onClick={onBack}
      className="bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2 mt-10"
    >
      Back to Guests <UsersRound size={16} />
    </button>
  </div>
);

};

export default ScanGuest;
